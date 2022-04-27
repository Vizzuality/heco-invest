resource "random_string" "random_string" {
  length  = 4
  keepers = {
    name = var.name
  }
  special = false
  upper   = false
}

resource "google_storage_bucket" "storage_bucket" {
  project       = var.project_id
  name          = "${var.name}-${random_string.random_string.result}"
  location      = var.region
  force_destroy = true
  storage_class = var.storage_class

  cors {
    origin          = [var.cors_origin]
    method          = ["GET", "HEAD", "PUT", "POST"]
    response_header = ["*"]
    max_age_seconds = 3600
  }
  versioning {
    enabled = true
  }
}

resource "google_storage_bucket_iam_member" "objectViewer" {
  bucket = google_storage_bucket.storage_bucket.name
  role   = "roles/storage.objectViewer"
  member = "serviceAccount:${var.service_account_email}"
}

resource "google_storage_bucket_iam_member" "objectCreator" {
  bucket = google_storage_bucket.storage_bucket.name
  role   = "roles/storage.objectCreator"
  member = "serviceAccount:${var.service_account_email}"
}
