resource "google_project_service" "artifact_registry_api" {
  service    = "artifactregistry.googleapis.com"
  disable_on_destroy = false
}

resource "google_artifact_registry_repository" "repository" {
  provider = google-beta

  location = var.region
  project  = var.project_id
  repository_id = var.name
  description = "Docker image repository for ${var.name}"
  format = "DOCKER"

  cleanup_policy_dry_run = true
}
