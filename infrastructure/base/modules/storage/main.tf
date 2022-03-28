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
