module "pipeline" {
  source                = "../pipeline"
  app_path              = "${var.app_path}"
  cluster_name          = "${var.cluster_name}"
  container_name       = "${var.container_name}"
  app_repository_name   = "${var.app_repository_name}"
  git_repository_owner  = "${var.git_repository_owner}"
  git_repository_name   = "${var.git_repository_name}"
  git_repository_branch = "${var.git_repository_branch}"
  repository_url        = "${aws_ecr_repository.web-app.repository_url}"
  app_service_name               = "${aws_ecs_service.web-api.name}"
  account_id                     = "${var.account_id}"
  vpc_id                         = "${var.vpc_id}"
  region                         = "${var.region}" 
  subnet_ids = var.subnet_ids
}
