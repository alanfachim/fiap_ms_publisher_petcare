resource "aws_s3_bucket" "source" {
  bucket        = "${var.cluster_name}-${var.account_id}-${var.app_path}-pipeline"
  acl           = "private"
  force_destroy = true
}
