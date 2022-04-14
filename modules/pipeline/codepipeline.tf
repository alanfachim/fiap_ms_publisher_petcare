
resource "aws_codecommit_repository" "repo" {
  repository_name = "${var.git_repository_name}-${var.app_path}"
  description     = "CodeCommit Terraform repo for demo"
  default_branch  = "${var.git_repository_branch}"
}

output "clone_url_http" {
  value = "${aws_codecommit_repository.repo.clone_url_http}"
}

resource "aws_codepipeline" "pipeline" {
  name     = "${var.cluster_name}-${var.app_path}-pipeline"
  role_arn = "${aws_iam_role.codepipeline_role.arn}"

  artifact_store  {
    location = "${aws_s3_bucket.source.bucket}"
    type     = "S3"
  }

  stage {
    name = "Source"

    action {
      name             = "Source"
      category         = "Source"
      owner            = "AWS"
      provider         = "CodeCommit"
      version          = "1"
      output_artifacts = ["source"]

      configuration = { 
        RepositoryName    = "${var.git_repository_name}-${var.app_path}"
        BranchName = "${var.git_repository_branch}"
      }
    }
  }

  stage {
    name = "Build"

    action {
      name             = "Build"
      category         = "Build"
      owner            = "AWS"
      provider         = "CodeBuild"
      version          = "1"
      input_artifacts  = ["source"]
      output_artifacts = ["imagedefinitions"]

      configuration = {
        ProjectName = "${var.cluster_name}-${var.app_path}-codebuild"
      }
    }
  }

  stage {
    name = "Production"

    action {
      name            = "Deploy"
      category        = "Deploy"
      owner           = "AWS"
      provider        = "ECS"
      input_artifacts = ["imagedefinitions"]
      version         = "1"

      configuration = {
        ClusterName = "${var.cluster_name}"
        ServiceName = "${var.app_service_name}"
        FileName    = "imagedefinitions.json"
      }
    }
  }
}
