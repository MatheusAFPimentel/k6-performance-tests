k6 Performance Tests
Este projeto contém testes de performance utilizando o k6, uma ferramenta de código aberto para realizar testes de carga e performance de APIs. O objetivo deste projeto é realizar uma série de testes, como teste de carga, estresse, spike, endurance, entre outros, e gerar relatórios detalhados de performance.

Estrutura do Projeto
A estrutura do projeto é a seguinte:

bash
Copiar
Editar
k6-performance-tests/
├── tests/                 # Scripts de teste (smoke, load, stress, etc.)
│   ├── smoke-test.js      # Teste simples (smoke test)
│   ├── load-test.js       # Teste de carga
│   ├── stress-test.js     # Teste de estresse
│   ├── spike-test.js      # Teste de spike
│   ├── endurance-test.js  # Teste de endurance
│   └── scenarios-test.js  # Teste de cenários complexos
├── results/               # Resultados dos testes (JSON)
│   ├── load-test.json     # Resultados do teste de carga
│   ├── stress-test.json   # Resultados do teste de estresse
│   ├── spike-test.json    # Resultados do teste de spike
│   ├── endurance-test.json# Resultados do teste de endurance
│   └── scenarios-test.json# Resultados do teste de cenários
├── Dockerfile             # Dockerfile para criar a imagem com k6
├── Jenkinsfile            # Definição do pipeline do Jenkins
├── .gitignore             # Arquivos e pastas a serem ignorados pelo git
└── README.md              # Este arquivo
Pré-requisitos
Antes de começar, é necessário ter os seguintes pré-requisitos:

Docker: Para construir e rodar os testes dentro de containers.
Jenkins (opcional): Para rodar os testes de forma automatizada utilizando pipelines.
Instalando o Docker
Se ainda não tiver o Docker instalado, siga as instruções da documentação oficial.

Instalando o Jenkins
Se você não tiver o Jenkins instalado, pode seguir o guia de instalação da documentação oficial do Jenkins.

Como Rodar os Testes
1. Rodar Localmente com Docker
Construir a Imagem Docker
Primeiro, você precisa construir a imagem Docker:

bash
Copiar
Editar
docker build -t k6-performance-tests-image .
Executar os Testes
Após a construção da imagem, você pode rodar os testes de performance localmente. Por exemplo, para rodar o teste de carga:

bash
Copiar
Editar
docker run --rm -v $(pwd)/tests:/k6-tests/tests -v $(pwd)/results:/k6-tests/results k6-performance-tests-image k6 run /k6-tests/tests/load-test.js
O comando acima irá executar o teste de carga e armazenar os resultados em results/load-test.json.

2. Rodar os Testes Usando Jenkins
Para rodar os testes automaticamente via Jenkins, siga os passos abaixo:

Crie um novo Job no Jenkins do tipo Pipeline.
Configuração do Pipeline:
Em Pipeline script from SCM, selecione o repositório Git onde o projeto está hospedado.
Adicione o caminho para o Jenkinsfile (geralmente Jenkinsfile na raiz do repositório).
Rodando o Pipeline: Assim que o Jenkins detectar um novo commit no repositório ou você iniciar a execução manualmente, ele irá:
Construir a imagem Docker
Rodar todos os testes de performance (smoke, load, stress, etc.)
Armazenar os resultados como artefatos
Gerar os relatórios
3. Analisando os Resultados
Os resultados dos testes são armazenados na pasta results/, e cada teste gera um arquivo JSON correspondente. O Jenkins pode ser configurado para armazenar esses resultados como artefatos e permitir o download.

Para gerar relatórios a partir dos arquivos JSON, você pode usar ferramentas como k6-reporter ou criar seus próprios scripts para análise e visualização.
