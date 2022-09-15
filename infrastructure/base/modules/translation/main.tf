resource "google_project_service" "translation_api" {
  service    = "translate.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_iam_member" "cloudtranslate_user" {
  project = var.project_id
  role    = "roles/cloudtranslate.user"
  member = "serviceAccount:${var.service_account_email}"
}
