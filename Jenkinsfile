
pipeline {
    agent {
        docker {
            image 'node:20-alpine'
            args '-u root'
        }
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Repository checked out'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Verify') {
            steps {
                sh 'ls -la dist'
            }
        }
    }

    post {
        success {
            archiveArtifacts artifacts: 'dist/**'
            echo 'Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed!'
        }
    }
}
