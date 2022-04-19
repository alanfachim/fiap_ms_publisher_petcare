 
data "template_file" "buildspec" {
  template = "${file("${path.module}/templates/buildspec.yml")}"

  vars = {
    REPOSITORY_URI = "${var.repository_url}"
    AWS_DEFAULT_REGION         = "${var.region}"
    TAG         = "latest"
    APP_PATH   = "${var.app_path}"
   }
}
 

resource "aws_codebuild_project" "app_build" {
  name          = "${var.cluster_name}-${var.app_path}-codebuild"
  build_timeout = "60"

  service_role = "${aws_iam_role.codebuild_role.arn}"

  artifacts {
    type = "CODEPIPELINE"
  }

  environment {
    compute_type = "BUILD_GENERAL1_SMALL"

    // https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-available.html
    image           = "aws/codebuild/amazonlinux2-x86_64-standard:3.0"
    type            = "LINUX_CONTAINER"
    privileged_mode = true
  }

  source {
    type      = "CODEPIPELINE"
    buildspec = "${data.template_file.buildspec.rendered}"
  }
}
 
