import json
import csv
import os

# --- CONFIGURAÇÃO AUTOMÁTICA DE CAMINHOS ---
# Verifica se os arquivos estão na pasta atual (caso você rode de dentro de 'data')
if os.path.exists('timeline.json'):
    JSON_FOLDER = '.'
    CSV_FOLDER = '../planilhas_para_edicao' # Salva uma pasta acima para não misturar
    if not os.path.exists(CSV_FOLDER):
        try:
            os.makedirs(CSV_FOLDER)
        except:
            CSV_FOLDER = 'planilhas_para_edicao' # Fallback se der erro de permissão
            if not os.path.exists(CSV_FOLDER): os.makedirs(CSV_FOLDER)
else:
    # Caso rode da raiz do projeto (padrão)
    JSON_FOLDER = 'src/data'
    CSV_FOLDER = 'planilhas_para_edicao'
    if not os.path.exists(CSV_FOLDER):
        os.makedirs(CSV_FOLDER)

print(f"📂 Diretório de leitura JSON detectado: {os.path.abspath(JSON_FOLDER)}")
print(f"📂 Diretório de saída CSV: {os.path.abspath(CSV_FOLDER)}")

FILES_MAP = [
    {'json': 'timeline.json', 'csv': 'linha_do_tempo.csv'},
    {'json': 'tributes.json', 'csv': 'homenagens.csv'}
]

def json_to_csv():
    print(f"\n--- EXPORTANDO PARA {CSV_FOLDER} ---")
    for mapping in FILES_MAP:
        json_path = os.path.join(JSON_FOLDER, mapping['json'])
        csv_path = os.path.join(CSV_FOLDER, mapping['csv'])

        try:
            with open(json_path, 'r', encoding='utf-8') as jf:
                data = json.load(jf)

            if not data:
                print(f"⚠ {mapping['json']} está vazio. Pulando.")
                continue

            # Pega as chaves originais
            original_keys = list(data[0].keys())
            
            # --- LÓGICA DE ORDENAÇÃO DAS COLUNAS ---
            # Define a ordem de prioridade. O que não estiver aqui vai para o final.
            # Aqui garantimos que fullText venha antes de summary.
            priority_order = ['id', 'year', 'name', 'years', 'title', 'fullText', 'summary', 'image', 'bio']
            
            headers = []
            # 1. Adiciona as colunas prioritárias se existirem no JSON
            for key in priority_order:
                if key in original_keys:
                    headers.append(key)
            
            # 2. Adiciona qualquer outra coluna que tenha sobrado (para não perder dados extras)
            for key in original_keys:
                if key not in headers:
                    headers.append(key)

            # 'utf-8-sig' é importante para o Excel abrir acentos corretamente
            with open(csv_path, 'w', newline='', encoding='utf-8-sig') as cf:
                writer = csv.DictWriter(cf, fieldnames=headers, delimiter=';') # Ponto e vírgula é melhor para Excel no Brasil
                writer.writeheader()
                writer.writerows(data)
            
            print(f"✅ Sucesso: {mapping['csv']} criado (fullText antes de summary).")
            
        except FileNotFoundError:
            print(f"❌ Erro: Arquivo {mapping['json']} não encontrado em {JSON_FOLDER}.")
        except Exception as e:
            print(f"❌ Erro ao processar {mapping['json']}: {e}")

    print("\n👉 Agora você pode abrir os arquivos na pasta 'planilhas_para_edicao' com o Excel.")
    print("⚠️  IMPORTANTE: Não mude o nome das colunas (primeira linha)!")

def csv_to_json():
    print(f"\n--- IMPORTANDO DE {CSV_FOLDER} PARA O SITE ---")
    for mapping in FILES_MAP:
        json_path = os.path.join(JSON_FOLDER, mapping['json'])
        csv_path = os.path.join(CSV_FOLDER, mapping['csv'])

        try:
            data = []
            # Lê o CSV
            with open(csv_path, 'r', encoding='utf-8-sig') as cf:
                # Tenta detectar se usaram vírgula ou ponto e vírgula
                content = cf.read()
                cf.seek(0)
                delimiter = ';' if ';' in content.split('\n')[0] else ','
                
                reader = csv.DictReader(cf, delimiter=delimiter)
                for row in reader:
                    # Converte ID para número se possível
                    if 'id' in row and row['id']:
                        try:
                            row['id'] = int(row['id'])
                        except ValueError:
                            pass # Mantém como string se não der
                    data.append(row)

            # Salva no JSON
            with open(json_path, 'w', encoding='utf-8') as jf:
                json.dump(data, jf, indent=4, ensure_ascii=False)
            
            print(f"✅ Sucesso: {mapping['json']} atualizado com os dados da planilha.")

        except FileNotFoundError:
            print(f"❌ Erro: Planilha {mapping['csv']} não encontrada em {CSV_FOLDER}.")
        except Exception as e:
            print(f"❌ Erro ao processar {mapping['csv']}: {e}")

def main():
    print("\n=== GERENCIADOR DE DADOS DA BIOÉTICA ===")
    print("1. Criar planilhas para edição (JSON -> Excel/CSV)")
    print("2. Atualizar site com as planilhas (Excel/CSV -> JSON)")
    
    choice = input("\nEscolha uma opção (1 ou 2): ")
    
    if choice == '1':
        json_to_csv()
    elif choice == '2':
        csv_to_json()
    else:
        print("Opção inválida.")

if __name__ == "__main__":
    main()