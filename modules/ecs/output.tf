 

output "service_name" {
  value = "${aws_ecs_service.web-api.name}"
}

#output "alb" {
#  value = "${aws_alb.app_alb.dns_name}"
#}

output "clone_url_http" {
  value = "${module.pipeline.clone_url_http}"
}