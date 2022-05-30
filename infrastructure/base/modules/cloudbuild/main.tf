resource "google_project_service" "cloud_build_api" {
  service            = "cloudbuild.googleapis.com"
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

locals {
  steps = concat([
    {
      name    = "docker/compose:1.29.2"
      timeout = "1800s"
      args    = concat(
        [
          "-f", "${var.docker_context_path}/docker-compose-test.yml",
          "up",
          "--build",
          "--exit-code-from",
          var.test_container_name,
          var.test_container_name
        ]
      )
      env = [for key, value in var.docker_build_args : "${key}=${value}"]
    }, {
      name    = "gcr.io/cloud-builders/docker"
      timeout = "1800s"
      args    = concat(
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
    }, {
      name = "gcr.io/cloud-builders/docker"
      args = ["push", "gcr.io/${var.project_id}/${var.image_name}:latest"]
    }, {
      name       = "gcr.io/google.com/cloudsdktool/cloud-sdk"
      entrypoint = "gcloud"
      args       = [
        "run", "deploy", var.cloud_run_service_name, "--image", "gcr.io/${var.project_id}/${var.image_name}:latest",
        "--region", var.region
      ]
    }
  ], var.additional_steps)
}

resource "google_cloudbuild_trigger" "build_trigger" {
  name        = "${var.project_name}-${var.deployment_name}"
  description = "Build ${var.project_name} ${var.deployment_name} Docker image"

  github {
    owner = var.github_org
    name  = var.github_project
    push {
      branch = "^${var.github_branch}$"
    }
  }

  build {
    timeout = "9000s"

    dynamic "step" {
      for_each = local.steps
      content {
        name       = lookup(step.value, "name", null)
        timeout    = lookup(step.value, "timeout", null)
        args       = lookup(step.value, "args", null)
        env        = lookup(step.value, "env", null)
        entrypoint = lookup(step.value, "entrypoint", null)
      }
    }

    images = ["gcr.io/${var.project_id}/${var.image_name}", "gcr.io/${var.project_id}/${var.image_name}:latest"]

    options {
      machine_type = "E2_HIGHCPU_8"
    }
  }

  substitutions = {for key, value in var.docker_build_args : "_${key}" => value}

  depends_on = [google_project_service.cloud_build_api]
}
