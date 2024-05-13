pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                sh 'docker build . -t $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/frontend'
            }
        }
        stage('Push Image') {
            steps {
                sh 'aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com'
                sh 'aws ecr describe-repositories --repository-names frontend || aws ecr create-repository --repository-name frontend'
                sh 'docker push $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/frontend'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker pull $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/frontend'
                sh 'docker rm -f frontend || true'
                sh 'docker run -d -p "2001:80" --name frontend $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/frontend'
            }
        }
    }
}