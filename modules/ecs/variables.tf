
variable "environment_variable" {
    description = "The config of application" 
}

variable "app_path" {
  description = "The path to the application" 
}
   

 variable "cluster_id" {
  description = "The cluster_name"
}
variable "account_id" {
  description = "The cluster_name"
}

variable "region" {
  description = "The cluster_name"
}
 
 variable "git_repository_branch" {
  description = "The cluster_name"
}
  variable "git_repository_name" {
  description = "The cluster_name"
}

variable "git_repository_owner" {
  description = "The cluster_name"
}

variable "cluster_name" {
  description = "The cluster_name"
}

variable "container_name" {
  description = "Container name"
}

variable "container_port" {
  description = "ALB target port"
}


variable "vpc_id" {
  description = "The VPC id"
}

variable "availability_zones" {
  type        = list
  description = "The azs to use"
}
variable "private_availability_zones" {
  type        = list
  description = "The azs to use"
}
 
variable "public_subnet_1a" {
  description = "Public Subnet on sa-east-1a"
}

variable "public_subnet_1b" {
  description = "Public Subnet on sa-east-1b"
}

variable "app_sg_id" {
  description = "App Security Group"
}

variable "alb_sg_id" {
  description = "Application Load Balancer Security Group"
}

variable "ecs_sg_id" {
  description = "ECS Security Group"
}

variable "security_groups_ids" {
  type        = list
  description = "Security group lists"
}

variable "app_repository_name" {
  description = "Name of ECR Repository"
}

variable "alb_port" {
  description = "ALB listener port"
}


variable "desired_tasks" {
  description = "Number of containers desired to run the application task"
}

variable "desired_task_cpu" {
  description = "Task CPU Limit"
}

variable "desired_task_memory" {
  description = "Task Memory Limit"
}

variable "min_tasks" {
  description = "Minimum"
}

variable "max_tasks" {
  description = "Maximum"
}

variable "cpu_to_scale_up" {
  description = "CPU % to Scale Up the number of containers"
}

variable "cpu_to_scale_down" {
  description = "CPU % to Scale Down the number of containers"
}

  
 
 variable "subnet_ids" {
  type        = list
  description = "Subnet ids"
}