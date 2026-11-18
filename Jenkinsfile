
pipeline {
    agent any

    tools {
        nodejs 'NodeJS-20'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out GitHub repository'
            }
        }

        stage('Build') {
            steps {
                sh 'node --version'
                sh 'npm --version'
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
                echo 'Application build verified!'
            }
        }
    }

    post {
        success {
            archiveArtifacts artifacts: 'dist/**',
                             fingerprint: true
            echo 'CI pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed. Check console output.'
        }
    }
}
