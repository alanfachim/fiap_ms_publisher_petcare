provider "aws" {
  region = "${var.aws_region}"
}


resource "aws_ecs_cluster" "cluster" {
  name = "${var.cluster_name}"
}


data "aws_caller_identity" "current" {}
