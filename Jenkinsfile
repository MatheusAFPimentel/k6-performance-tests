pipeline {
    agent any

    environment {
        // Variáveis de ambiente
        DOCKER_IMAGE = 'k6-performance-tests-image'
    }

    stages {
        stage('Preparação') {
            steps {
                script {
                    // Certifique-se de que o repositório foi clonado
                    echo 'Clonando repositório...'
                    checkout scm
                }
            }
        }

        stage('Construção da Imagem Docker') {
            steps {
                script {
                    echo 'Construindo imagem Docker para os testes...'
                    sh 'docker build -t $DOCKER_IMAGE .'
                }
            }
        }

        stage('Execução dos Testes') {
            steps {
                script {
                    echo 'Rodando os testes de performance com K6...'
                    sh 'docker run --rm -v $(pwd)/tests:/tests -v $(pwd)/results:/results $DOCKER_IMAGE k6 run /tests/smoke-test.js'
                    sh 'docker run --rm -v $(pwd)/tests:/tests -v $(pwd)/results:/results $DOCKER_IMAGE k6 run /tests/load-test.js'
                    sh 'docker run --rm -v $(pwd)/tests:/tests -v $(pwd)/results:/results $DOCKER_IMAGE k6 run /tests/stress-test.js'
                    sh 'docker run --rm -v $(pwd)/tests:/tests -v $(pwd)/results:/results $DOCKER_IMAGE k6 run /tests/spike-test.js'
                    sh 'docker run --rm -v $(pwd)/tests:/tests -v $(pwd)/results:/results $DOCKER_IMAGE k6 run /tests/endurance-test.js'
                    sh 'docker run --rm -v $(pwd)/tests:/tests -v $(pwd)/results:/results $DOCKER_IMAGE k6 run /tests/scenarios-test.js'
                }
            }
        }

        stage('Armazenamento dos Resultados') {
            steps {
                script {
                    echo 'Armazenando resultados dos testes...'
                    // Movendo resultados para uma pasta centralizada (se necessário)
                    archiveArtifacts artifacts: 'results/*.json', allowEmptyArchive: true
                }
            }
        }

        stage('Relatórios') {
            steps {
                script {
                    echo 'Gerando e publicando relatórios...'
                    // Aqui você pode incluir um relatório customizado ou usar um plugin para gerar relatórios do K6
                    // Exemplo de comando para transformar resultados JSON em HTML (usando k6-reporter ou outras ferramentas)
                    sh 'docker run --rm -v $(pwd)/results:/results k6-reporter -i /results/load-test.json -o /results/load-test-report.html'
                    sh 'docker run --rm -v $(pwd)/results:/results k6-reporter -i /results/stress-test.json -o /results/stress-test-report.html'
                }
            }
        }
    }

    post {
        always {
            // Sempre será executado, independentemente de sucesso ou falha
            echo 'Pipeline concluída.'
        }

        success {
            echo 'Pipeline executada com sucesso!'
        }

        failure {
            echo 'A pipeline falhou!'
        }
    }
}
