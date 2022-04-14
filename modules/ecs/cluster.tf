

resource "aws_cloudwatch_log_group" "web-app" {
  name = "${var.cluster_name}-${var.app_path}-logs"

  tags = {
    Application = "${var.cluster_name}"
  }
} 