#!/usr/bin/env python3
"""
Script para categorizar automaticamente eventos da timeline usando Ollama (gemma3:27b)

Uso:
    python3 categorize_events.py

Saída:
    - timeline_categorized.json: Timeline com categorias sugeridas
    - categorization_report.md: Relatório detalhado
"""

import json
import subprocess
import sys
from pathlib import Path
from typing import List, Dict, Any

# Categorias oficiais
CATEGORIES = [
    "Ética Médica e Clínica",
    "Legislação e Direitos",
    "Pesquisa e Experimentação",
    "Bioética Feminista",
    "Bioética Animal",
    "Bioética Ambiental",
    "Educação e Formação",
    "Saúde Pública",
    "Institucionalização"
]

def call_ollama(prompt: str, model: str = "gemma3:27b") -> str:
    """Chama o Ollama com o modelo especificado"""
    try:
        result = subprocess.run(
            ["ollama", "run", model],
            input=prompt,
            capture_output=True,
            text=True,
            timeout=30
        )
        return result.stdout.strip()
    except subprocess.TimeoutExpired:
        print(f"⚠️  Timeout ao processar evento", file=sys.stderr)
        return ""
    except Exception as e:
        print(f"❌ Erro ao chamar Ollama: {e}", file=sys.stderr)
        return ""

def categorize_event(event: Dict[str, Any]) -> List[str]:
    """Categoriza um evento usando o LLM"""
    
    prompt = f"""Você é um especialista em Bioética. Analise o seguinte evento histórico e categorize-o.

EVENTO:
Ano: {event['year']}
Título: {event['title']}
Resumo: {event['summary']}

CATEGORIAS DISPONÍVEIS:
{chr(10).join(f'{i+1}. {cat}' for i, cat in enumerate(CATEGORIES))}

INSTRUÇÕES:
- Escolha de 1 a 3 categorias mais relevantes para este evento
- Responda APENAS com os números das categorias, separados por vírgula
- Exemplo de resposta: 1,3,8

RESPOSTA (apenas números):"""

    response = call_ollama(prompt)
    
    # Parse da resposta
    try:
        # Remove espaços e quebras de linha
        response = response.strip().replace('\n', '').replace(' ', '')
        
        # Extrai números
        numbers = [int(n.strip()) for n in response.split(',') if n.strip().isdigit()]
        
        # Valida e converte para categorias
        categories = []
        for num in numbers:
            if 1 <= num <= len(CATEGORIES):
                categories.append(CATEGORIES[num - 1])
        
        # Se não conseguiu extrair categorias válidas, tenta usar o primeiro número
        if not categories and response:
            # Tenta pegar apenas dígitos
            digits = ''.join(c for c in response if c.isdigit())
            if digits:
                num = int(digits[0])
                if 1 <= num <= len(CATEGORIES):
                    categories.append(CATEGORIES[num - 1])
        
        return categories if categories else ["Institucionalização"]  # fallback
        
    except Exception as e:
        print(f"⚠️  Erro ao parsear resposta: {response[:50]}... | Erro: {e}", file=sys.stderr)
        return ["Institucionalização"]  # categoria padrão em caso de erro

def main():
    # Caminhos
    script_dir = Path(__file__).parent
    data_dir = script_dir.parent / "src" / "data"
    input_file = data_dir / "timeline.json"
    output_file = data_dir / "timeline_categorized.json"
    report_file = script_dir / "categorization_report.md"
    
    print("🤖 Categorizador Automático de Eventos - Ollama + gemma3:27b")
    print("=" * 70)
    
    # Verifica se Ollama está instalado
    try:
        subprocess.run(["ollama", "--version"], capture_output=True, check=True)
        print("✅ Ollama detectado")
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("❌ Ollama não encontrado. Instale com: brew install ollama")
        sys.exit(1)
    
    # Verifica se o modelo está disponível
    print("🔍 Verificando modelo gemma3:27b...")
    try:
        result = subprocess.run(
            ["ollama", "list"],
            capture_output=True,
            text=True,
            check=True
        )
        if "gemma3:27b" not in result.stdout:
            print("⚠️  Modelo gemma3:27b não encontrado")
            print("📥 Baixando modelo (pode demorar alguns minutos)...")
            subprocess.run(["ollama", "pull", "gemma3:27b"], check=True)
    except Exception as e:
        print(f"⚠️  Aviso: {e}")
    
    # Carrega timeline
    print(f"\n📖 Carregando {input_file}...")
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            events = json.load(f)
    except FileNotFoundError:
        print(f"❌ Arquivo não encontrado: {input_file}")
        sys.exit(1)
    
    print(f"✅ {len(events)} eventos carregados")
    
    # Processa eventos
    print(f"\n🏷️  Categorizando eventos...\n")
    
    categorized_events = []
    report_lines = [
        "# Relatório de Categorização Automática",
        f"\n**Total de eventos**: {len(events)}",
        f"**Modelo**: gemma3:27b",
        f"**Categorias**: {len(CATEGORIES)}\n",
        "---\n"
    ]
    
    category_stats = {cat: 0 for cat in CATEGORIES}
    
    for i, event in enumerate(events, 1):
        print(f"[{i}/{len(events)}] Processando: {event['title'][:50]}...", end=" ")
        
        categories = categorize_event(event)
        
        # Atualiza evento
        event_copy = event.copy()
        event_copy['categories'] = categories
        categorized_events.append(event_copy)
        
        # Estatísticas
        for cat in categories:
            category_stats[cat] += 1
        
        # Relatório
        report_lines.append(f"## {i}. {event['title']}")
        report_lines.append(f"**Ano**: {event['year']}")
        report_lines.append(f"**Categorias**: {', '.join(categories)}\n")
        
        print(f"✅ {len(categories)} categoria(s)")
    
    # Adiciona estatísticas ao relatório
    report_lines.append("\n---\n")
    report_lines.append("## Estatísticas\n")
    report_lines.append("| Categoria | Eventos |")
    report_lines.append("|-----------|---------|")
    for cat in sorted(category_stats.keys(), key=lambda x: category_stats[x], reverse=True):
        report_lines.append(f"| {cat} | {category_stats[cat]} |")
    
    # Salva timeline categorizada
    print(f"\n💾 Salvando {output_file}...")
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(categorized_events, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Timeline categorizada salva!")
    
    # Salva relatório
    print(f"📊 Salvando relatório {report_file}...")
    with open(report_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(report_lines))
    
    print(f"✅ Relatório salvo!")
    
    # Resumo
    print("\n" + "=" * 70)
    print("✨ Categorização concluída!")
    print(f"📁 Arquivo gerado: {output_file}")
    print(f"📊 Relatório: {report_file}")
    print("\n🔍 Próximos passos:")
    print("1. Revise o arquivo timeline_categorized.json")
    print("2. Verifique o relatório para estatísticas")
    print("3. Substitua o timeline.json original se estiver satisfeito")
    print("=" * 70)

if __name__ == "__main__":
    main()
