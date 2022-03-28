resource "google_storage_bucket" "storage_bucket" {
  project       = var.project_id
  name          = var.name
  location      = var.region
  force_destroy = true
  storage_class = var.storage_class

  versioning {
    enabled = true
  }
}

resource "google_storage_bucket_iam_member" "objectViewer" {
  bucket = google_storage_bucket.storage_bucket.name
  role = "roles/storage.objectViewer"
  member = "serviceAccount:${var.service_account_email}"
}

resource "google_storage_bucket_iam_member" "objectCreator" {
  bucket = google_storage_bucket.storage_bucket.name
  role = "roles/storage.objectCreator"
  member = "serviceAccount:${var.service_account_email}"
}
