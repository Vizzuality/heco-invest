resource "google_artifact_registry_repository" "repository" {
  provider = google-beta

  location = var.region
  project  = var.project_id
  repository_id = var.name
  description = "HeCo docker image repository for ${var.name}"
  format = "DOCKER"
}
