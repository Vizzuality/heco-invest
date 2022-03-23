resource "google_cloudbuild_trigger" "build_trigger" {
  name        = "heco-${var.name}"
  description = "Build frontend Docker image"

  github {
    owner = var.github_org
    name  = var.github_project
    push {
      branch = var.github_branch
    }
  }

  build {
    timeout = "900s"

    step {
      name = "gcr.io/cloud-builders/docker"
      timeout = "900s"
      args = concat(
        [
          "build",
          "-f", var.dockerfile_path,
          "-t", "gcr.io/${var.project_id}/${var.image_name}",
          "-t", "gcr.io/${var.project_id}/${var.image_name}:latest",
        ],
        [for key, value in var.docker_build_args : "--build-arg=${key}=$_${key}"],
        [
          var.docker_context_path
        ]
      )
    }

    step {
      name = "gcr.io/cloud-builders/docker"
      args = ['push', '-a', 'gcr.io/${var.project_id}/${var.image_name}']
    }

    step {
      name = "gcr.io/google.com/cloudsdktool/cloud-sdk"
      entrypoint = "gcloud"
      args = ['run', 'deploy', var.cloud_run_service_name, '--image', 'gcr.io/${var.project_id}/${var.image_name}', '--region', var.region]
    }

    images = ["gcr.io/${var.project_id}/${var.image_name}", "gcr.io/${var.project_id}/${var.image_name}:latest"]
  }

  substitutions = {for key, value in var.docker_build_args : "_${key}" => value}
}
