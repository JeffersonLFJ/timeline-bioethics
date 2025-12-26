#!/usr/bin/env python3
"""
Script para mesclar as categorias do timeline_categorized.json com o timeline.json original.
"""

import json
import sys
from pathlib import Path

def merge_categories():
    """Mescla as categorias geradas no arquivo timeline original."""
    
    # Caminhos dos arquivos
    script_dir = Path(__file__).parent
    data_dir = script_dir.parent / "src" / "data"
    
    categorized_file = data_dir / "timeline_categorized.json"
    original_file = data_dir / "timeline.json"
    backup_file = data_dir / "timeline_backup.json"
    
    print("🔄 Mesclando categorias com o timeline original...")
    print(f"📂 Arquivo categorizado: {categorized_file}")
    print(f"📂 Arquivo original: {original_file}")
    
    # Verificar se os arquivos existem
    if not categorized_file.exists():
        print(f"❌ Erro: Arquivo {categorized_file} não encontrado!")
        return False
    
    if not original_file.exists():
        print(f"❌ Erro: Arquivo {original_file} não encontrado!")
        return False
    
    # Carregar o arquivo categorizado
    try:
        with open(categorized_file, 'r', encoding='utf-8') as f:
            categorized_data = json.load(f)
        print(f"✅ Carregado arquivo categorizado: {len(categorized_data)} eventos")
    except Exception as e:
        print(f"❌ Erro ao carregar arquivo categorizado: {e}")
        return False
    
    # Carregar o arquivo original
    try:
        with open(original_file, 'r', encoding='utf-8') as f:
            original_data = json.load(f)
        print(f"✅ Carregado arquivo original: {len(original_data)} eventos")
    except Exception as e:
        print(f"❌ Erro ao carregar arquivo original: {e}")
        return False
    
    # Fazer backup do arquivo original
    try:
        with open(backup_file, 'w', encoding='utf-8') as f:
            json.dump(original_data, f, ensure_ascii=False, indent=2)
        print(f"✅ Backup criado: {backup_file}")
    except Exception as e:
        print(f"⚠️  Aviso: Não foi possível criar backup: {e}")
    
    # Criar dicionário de categorias por ID
    categories_by_id = {}
    for event in categorized_data:
        event_id = event.get('id')
        categories = event.get('categories', [])
        if event_id and categories:
            categories_by_id[event_id] = categories
    
    print(f"📊 Categorias encontradas para {len(categories_by_id)} eventos")
    
    # Adicionar categorias aos eventos originais
    updated_count = 0
    for event in original_data:
        event_id = event.get('id')
        if event_id in categories_by_id:
            event['categories'] = categories_by_id[event_id]
            updated_count += 1
    
    print(f"✅ {updated_count} eventos atualizados com categorias")
    
    # Salvar o arquivo atualizado
    try:
        with open(original_file, 'w', encoding='utf-8') as f:
            json.dump(original_data, f, ensure_ascii=False, indent=4)
        print(f"✅ Arquivo timeline.json atualizado com sucesso!")
    except Exception as e:
        print(f"❌ Erro ao salvar arquivo: {e}")
        return False
    
    # Estatísticas das categorias
    print("\n📊 Estatísticas de categorias:")
    category_counts = {}
    for event in original_data:
        for category in event.get('categories', []):
            category_counts[category] = category_counts.get(category, 0) + 1
    
    for category, count in sorted(category_counts.items(), key=lambda x: x[1], reverse=True):
        print(f"   • {category}: {count} eventos")
    
    return True

if __name__ == "__main__":
    success = merge_categories()
    sys.exit(0 if success else 1)
