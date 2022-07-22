docker build -f Dockerfile.prod -t opensessame_api .
docker tag opensessame_api:latest 672165885244.dkr.ecr.sa-east-1.amazonaws.com/ecr_repo:latest
