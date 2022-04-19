resource "aws_ecr_repository" "web-app" {
  name = var.app_path
} 