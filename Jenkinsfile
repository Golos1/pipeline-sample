pipeline {
    agent {
        docker {
            image 'node:23-alpine'
            args '-p 3000:3000'
       }
 }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build Next.js App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying to Vercel...'
            }
        }
    }

    post {
        success {
            archiveArtifacts artifacts: '.next/**/*', allowEmptyArchive: false
        }
    }
}