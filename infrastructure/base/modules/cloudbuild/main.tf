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
    step {
      name = "gcr.io/cloud-builders/docker"
      args = [
        "build",
        "-f", var.dockerfile_path,
        "-t", "gcr.io/${var.project_id}/${var.image_name}",
        "-t", "gcr.io/${var.project_id}/${var.image_name}:latest",
        var.docker_context_path
      ]
    }
  }
}
