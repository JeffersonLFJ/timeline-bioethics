# Scripts de Automação - Timeline Bioética

## categorize_events.py

Script para categorizar automaticamente eventos da timeline usando Ollama com o modelo gemma2:27b.

### Pré-requisitos

1. **Ollama instalado**:
   ```bash
   # Se não tiver Ollama
   brew install ollama
   ```

2. **Modelo gemma2:27b**:
   ```bash
   # O script faz download automaticamente se necessário
   # Ou baixe manualmente:
   ollama pull gemma2:27b
   ```

3. **Python 3.7+** (já vem no macOS)

### Como Usar

1. **Navegue até o diretório do projeto**:
   ```bash
   cd "/Users/jeffersonlopes/Desktop/PPGBIOS 2025/Página/timeline-bioetica"
   ```

2. **Execute o script**:
   ```bash
   python3 scripts/categorize_events.py
   ```

3. **Aguarde o processamento**:
   - O script processa os 114 eventos
   - Cada evento leva ~2-3 segundos
   - Tempo total estimado: **5-10 minutos**

### Saída

O script gera dois arquivos:

1. **`src/data/timeline_categorized.json`**
   - Timeline completa com campo `categories` adicionado
   - Pronto para substituir o `timeline.json` original

2. **`scripts/categorization_report.md`**
   - Relatório detalhado com:
     - Lista de categorias por evento
     - Estatísticas de distribuição
     - Contagem por categoria

### Revisão

Após a execução:

1. **Revise o relatório**: `scripts/categorization_report.md`
2. **Verifique categorias**: Abra `timeline_categorized.json`
3. **Ajuste manualmente** se necessário
4. **Substitua o original**:
   ```bash
   # Backup do original
   cp src/data/timeline.json src/data/timeline_backup.json
   
   # Substitui pelo categorizado
   mv src/data/timeline_categorized.json src/data/timeline.json
   ```

### Categorias Utilizadas

O script usa as 9 categorias aprovadas:

1. Ética Médica e Clínica
2. Legislação e Direitos
3. Pesquisa e Experimentação
4. Bioética Feminista
5. Bioética Animal
6. Bioética Ambiental
7. Educação e Formação
8. Saúde Pública
9. Institucionalização

### Troubleshooting

**Problema**: `ollama: command not found`
- **Solução**: Instale o Ollama (`brew install ollama`)

**Problema**: Modelo não encontrado
- **Solução**: `ollama pull gemma2:27b`

**Problema**: Timeout nos eventos
- **Solução**: Aumente o timeout na linha 32 do script

**Problema**: Categorias estranhas
- **Solução**: O LLM pode errar em alguns eventos, revise manualmente

### Próximos Passos

Após categorizar:

1. ✅ Implementar componente `CategoryFilter.jsx`
2. ✅ Adicionar filtros na `TimelineSection.jsx`
3. ✅ Testar a navegação por categorias
