
pipeline {
    agent {
        docker {
            image 'node:20-alpine'
            args '-u root -v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    stages {

        stage('Install Docker CLI') {
            steps {
                sh 'apk add --no-cache docker-cli'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Application') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t little-shop:${BUILD_NUMBER} .'
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
                      little-shop:${BUILD_NUMBER}
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh 'docker ps --filter name=little-shop'
                echo 'Deployment completed!'
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
