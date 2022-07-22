variable "aws_region" {
  default     = "sa-east-1"
  type        = string
  description = "Which region should the resources be deployed into?"
}

variable "aws_access_key" {
  type = string
}

variable "aws_secret_key" {
  type = string
}
