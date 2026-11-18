
pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            agent {
                docker {
                    image 'node:20-alpine'
                    reuseNode true
                    args '-u root'
                }
            }
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            agent {
                docker {
                    image 'node:20-alpine'
                    reuseNode true
                    args '-u root'
                }
            }
            steps {
                sh 'npm test'
            }
        }

        stage('Build Application') {
            agent {
                docker {
                    image 'node:20-alpine'
                    reuseNode true
                    args '-u root'
                }
            }
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker version'
                sh 'docker build -t little-shop:${BUILD_NUMBER} -t little-shop:latest .'
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                    docker rm -f little-shop || true

                    docker run -d \
                      --name little-shop \
                      -p 8082:80 \
                      --restart unless-stopped \
                      little-shop:latest
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh 'docker ps --filter name=little-shop'
                echo 'Deployment completed successfully!'
            }
        }
    }

    post {
        success {
            echo 'CI/CD Pipeline completed successfully!'
            echo 'Website: http://localhost:8082'
        }

        failure {
            echo 'Pipeline failed. Check the console output.'
        }
    }
}
