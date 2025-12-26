# Linha do Tempo da Bioética

Uma jornada visual e interativa pelos principais marcos da bioética no Brasil e no mundo. Este projeto foi desenvolvido para facilitar o acesso e a compreensão da evolução dos conceitos, legislações e eventos fundamentais que moldaram o campo da bioética.

## 🚀 Funcionalidades

- **Linha do Tempo Interativa**: Explore eventos cronologicamente organizados.
- **Filtros por Categoria**: Filtre eventos por áreas como Ética Médica, Bioética Ambiental, Feminista, Animal, entre outras.
- **Busca e Filtragem por Período**: Localize eventos específicos ou explore janelas temporais definidas.
- **Homenagens Póstumas**: Seção dedicada a grandes nomes que contribuíram para a bioética.
- **Design Responsivo**: Experiência otimizada para diferentes dispositivos.

## 🛠️ Tecnologias

- **React 19**
- **Vite**
- **Tailwind CSS**
- **Lucide React** (Ícones)
- **Vitest** (Testes)

## 📁 Estrutura do Projeto

- `src/components/`: Componentes modulares da interface.
- `src/data/`: Arquivos JSON contendo os dados da linha do tempo e homenagens.
- `scripts/`: Scripts utilitários em Python para processamento de dados (ex: categorização via LLM).
- `planilhas_para_edicao/`: Planilhas originais utilizadas como fonte de dados.

## 🏁 Como Começar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/timeline-bioetica.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## 🏗️ Scripts de Dados

O projeto conta com scripts em Python localizados na pasta `scripts/` para automação de tarefas como:
- Conversão de dados de CSV para JSON.
- Categorização automática de eventos usando modelos de linguagem (Ollama/Gemma).

Para mais detalhes sobre os scripts, consulte `scripts/README.md`.

## 📄 Licença

Este projeto está licenciado sob a **Mozilla Public License 2.0 (MPL 2.0)** - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
Desenvolvido por Jefferson Lopes.
