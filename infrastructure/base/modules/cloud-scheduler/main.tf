resource "google_project_service" "cloud_scheduler_api" {
  service            = "cloudscheduler.googleapis.com"
  disable_on_destroy = false
}

resource "google_cloud_scheduler_job" "job" {
  name             = var.name
  description      = "${var.name} job"
  schedule         = var.schedule
  time_zone        = var.time_zone
  attempt_deadline = "320s"

  retry_config {
    retry_count = 1
  }

  http_target {
    http_method = var.http_method
    uri         = var.uri
    oidc_token {
      service_account_email = var.service_account_email
    }
  }

}
