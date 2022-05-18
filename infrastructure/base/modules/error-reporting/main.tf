resource "google_project_service" "error_reporting_api" {
  service            = "clouderrorreporting.googleapis.com"
  disable_on_destroy = false
}
