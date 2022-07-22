resource "aws_vpc" "vpc_a" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
}

resource "aws_subnet" "subnet_a" {
  vpc_id            = aws_vpc.vpc_a.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "${var.aws_region}a"
}

resource "aws_subnet" "subnet_b" {
  vpc_id            = aws_vpc.vpc_a.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "${var.aws_region}b"
}

resource "aws_internet_gateway" "internet_gateway" {
  vpc_id = aws_vpc.vpc_a.id
}

resource "aws_route" "route" {
  route_table_id         = aws_vpc.vpc_a.main_route_table_id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.internet_gateway.id
}

resource "aws_security_group" "security_group" {
  name        = "security_group"
  description = "Allow HTTP traffic on port 80"
  vpc_id      = aws_vpc.vpc_a.id

  ingress {
    cidr_blocks = ["0.0.0.0/0"]
    description = "HTTP"
    from_port   = 80
    protocol    = "tcp"
    to_port     = 3000
  }

  egress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = 0
    protocol    = "-1"
    to_port     = 0
  }
}
