resource "aws_ecs_service" "web-api" {
  name            = "${var.cluster_name}-${var.app_path}"
  task_definition = "${aws_ecs_task_definition.web-api.arn}"
  cluster         = "${var.cluster_id}"
  launch_type     = "FARGATE"
  desired_count   = "${var.desired_tasks}"

  network_configuration {
    security_groups  = [var.ecs_sg_id] 
    subnets = flatten(var.private_availability_zones )
    assign_public_ip = true
  }

  #load_balancer {
  #  target_group_arn = "${aws_alb_target_group.api_target_group.arn}"
  #  container_name   = "${var.container_name}"
  #  container_port   = "${var.container_port}"
  #}
  
  lifecycle {
    ignore_changes = [desired_count, task_definition]
  }  

  #depends_on = [aws_alb_target_group.api_target_group]
}
