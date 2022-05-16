resource "google_project_service" "translation_api" {
  service    = "translate.googleapis.com"
  disable_on_destroy = false
}
