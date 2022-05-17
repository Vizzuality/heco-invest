resource "google_project_service" "cloud_tasks_api" {
  service    = "cloudtasks.googleapis.com"
  disable_on_destroy = false
}

resource "google_cloud_tasks_queue" "cloud_task" {
  name     = "${var.prefix}-${var.name}"
  location = var.region
}

resource "google_project_iam_member" "cloud_tasks_queue_admin" {
  project = var.project_id
  role    = "roles/cloudtasks.queueAdmin"
  member = "serviceAccount:${var.service_account_email}"
}
