# This config would theoretically allow us to integrate Cloud Build with GH webhooks without
# having to grant Google a bunch of permissions that it does not need.
# Unfortunately, due to https://github.com/hashicorp/terraform-provider-google/issues/11327 that's not possible.
# I'm leaving this module here, unused, as a POC/work so far, in hopes that one day it can replace the
# privacy-loose implementation that relies on the Google integration

resource "google_project_service" "cloud_run_api" {
  service    = "cloudbuild.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "secret_manager_api" {
  service    = "secretmanager.googleapis.com"
  disable_on_destroy = false
}

locals {
  secret_key = random_password.secret_key.result
}

resource "random_password" "secret_key" {
  length  = 24
  special = true
}

data "google_project" "project" {}

data "google_iam_policy" "secret_accessor" {
  binding {
    role = "roles/secretmanager.secretAccessor"
    members = [
      "serviceAccount:service-${data.google_project.project.number}@gcp-sa-cloudbuild.iam.gserviceaccount.com",
    ]
  }
}

resource "google_secret_manager_secret" "webhook_trigger_secret_key" {
  secret_id = "${var.name}_webhook_trigger_secret"

  replication {
    user_managed {
      replicas {
        location = var.region
      }
    }
  }
}

resource "google_secret_manager_secret_version" "webhook_trigger_secret_key_data" {
  secret = google_secret_manager_secret.webhook_trigger_secret_key.id

  secret_data = local.secret_key
}


resource "google_secret_manager_secret_iam_policy" "policy" {
  project = google_secret_manager_secret.webhook_trigger_secret_key.project
  secret_id = google_secret_manager_secret.webhook_trigger_secret_key.secret_id
  policy_data = data.google_iam_policy.secret_accessor.policy_data
}


resource "google_cloudbuild_trigger" "build_trigger" {
  name = "heco-${var.name}"
  description = "Build frontend Docker image"

  webhook_config {
    secret = google_secret_manager_secret_version.webhook_trigger_secret_key_data.id
  }

  source_to_build {
    uri       = "https://github.com/${var.github_org}/${var.github_project}"
    ref       = "refs/heads/${var.github_branch}"
    repo_type = "GITHUB"
  }

  build {
    step {
      name = "gcr.io/cloud-builders/docker"
      args = [
        "build", "-t", "gcr.io/${var.project_id}/${var.github_project}", "-t",
        "gcr.io/${var.project_id}/${var.image_name}:latest", "."
      ]
    }
  }
}

resource "github_repository_webhook" "webhook" {
  repository = var.github_project

  configuration {
    url          =  "https://cloudbuild.googleapis.com/v1/projects/${var.project_id}/triggers/${google_cloudbuild_trigger.build_trigger.name}:webhook?key=&secret=${google_secret_manager_secret_version.webhook_trigger_secret_key_data.secret_data}"
    content_type = "form"
    insecure_ssl = false
  }

  events = ["push"]
}
