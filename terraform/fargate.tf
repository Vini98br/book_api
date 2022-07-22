resource "aws_ecs_task_definition" "api_task" {
  family = "api_family"

  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"

  memory = 1024
  cpu    = 256

  execution_role_arn = aws_iam_role.ecs_role.arn

  container_definitions = jsonencode([
    {
      name      = "opensessame_api"
      image     = "${aws_ecr_repository.ecr_repo.repository_url}:latest"
      memory    = 1024
      cpu       = 16
      essential = true
      portMappings = [{
        "containerPort" = 3000
        "hostPort"      = 3000
      }]
    }
  ])
}

resource "aws_ecs_cluster" "api_cluster" {
  name = "api_cluster"
}

resource "aws_ecs_service" "api_service" {
  name = "api_service"

  cluster         = aws_ecs_cluster.api_cluster.id
  task_definition = aws_ecs_task_definition.api_task.arn

  launch_type   = "FARGATE"
  desired_count = 1

  force_new_deployment = true
  network_configuration {
    subnets          = ["${aws_subnet.subnet_a.id}", "${aws_subnet.subnet_b.id}"]
    security_groups  = ["${aws_security_group.security_group.id}"]
    assign_public_ip = true
  }
}
