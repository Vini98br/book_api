ACCOUNT_ID=$(aws sts get-caller-identity | jq -r ".Account")
REGION="sa-east-1"
ECR_URI="$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com"
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ECR_URI
docker push "$ECR_URI/ecr_repo:latest"
