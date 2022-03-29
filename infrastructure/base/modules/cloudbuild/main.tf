resource "google_project_service" "cloud_build_api" {
  service    = "cloudbuild.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service_identity" "cloudbuild_service_identity" {
  provider = google-beta

  project = var.project_id
  service = "cloudbuild.googleapis.com"
}

resource "google_project_iam_member" "act_as" {
  project = var.project_id
  role    = "roles/iam.serviceAccountUser"
  member  = "serviceAccount:${google_project_service_identity.cloudbuild_service_identity.email}"
}

resource "google_project_iam_member" "artifactregistry_writer" {
  project = var.project_id
  role    = "roles/artifactregistry.writer"
  member  = "serviceAccount:${google_project_service_identity.cloudbuild_service_identity.email}"
}

resource "google_project_iam_member" "cloudrun_developer" {
  project = var.project_id
  role    = "roles/run.developer"
  member  = "serviceAccount:${google_project_service_identity.cloudbuild_service_identity.email}"
}

resource "google_cloudbuild_trigger" "build_trigger" {
  name        = "${var.project_name}-${var.deployment_name}"
  description = "Build ${var.project_name} ${var.deployment_name} Docker image"

  github {
    owner = var.github_org
    name  = var.github_project
    push {
      branch = var.github_branch
    }
  }

  build {
    timeout = "1200s"

    step {
      name = "gcr.io/${var.project_id}/docker-compose"
      timeout = "1200s"
      args = concat(
        [
          "build",
          "-f", "docker-compose-test.yml",
        ],
        [for key, value in var.docker_build_args : "--build-arg ${key}=$_${key}"],
        [
          var.docker_context_path
        ]
      )
    }

    step {
      name = "gcr.io/${var.project_id}/docker-compose"
      timeout = "1200s"
      args = concat(
        [
          "run",
          "-f", "docker-compose-test.yml",
          var.test_container_name
        ]
      )
    }

    step {
      name = "gcr.io/cloud-builders/docker"
      timeout = "1200s"
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
      args = ["push", "gcr.io/${var.project_id}/${var.image_name}:latest"]
    }

    step {
      name = "gcr.io/google.com/cloudsdktool/cloud-sdk"
      entrypoint = "gcloud"
      args = ["run", "deploy", var.cloud_run_service_name, "--image", "gcr.io/${var.project_id}/${var.image_name}:latest", "--region", var.region]
    }

    images = ["gcr.io/${var.project_id}/${var.image_name}", "gcr.io/${var.project_id}/${var.image_name}:latest"]
  }

  substitutions = {for key, value in var.docker_build_args : "_${key}" => value}

  depends_on = [google_project_service.cloud_build_api]
}
