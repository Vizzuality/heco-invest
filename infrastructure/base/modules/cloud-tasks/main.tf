resource "google_project_service" "cloud_tasks_api" {
  service    = "cloudtasks.googleapis.com"
  disable_on_destroy = false
}

resource "google_cloud_tasks_queue" "cloud_tasks" {
  name     = "${var.prefix}-${var.name}"
  location = var.region
}

resource "google_project_iam_member" "cloud_tasks_backend_admin" {
  project = var.project_id
  role    = "roles/cloudtasks.admin"
  member = "serviceAccount:${var.backend_service_account_email}"
}

resource "google_project_iam_member" "cloud_tasks_jobs_enqueuer" {
  project = var.project_id
  role    = "roles/cloudtasks.enqueuer"
  member = "serviceAccount:${var.jobs_service_account_email}"
}
