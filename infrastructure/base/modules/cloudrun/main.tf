resource "google_cloud_run_service" "cloud_run" {
  name     = var.name
  location = var.region

  template {
    spec {
      containers {
        image = "gcr.io/${var.project_id}/${var.image_name}:latest"
        args = ["start:prod"]
        ports {
          container_port = 3000
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}
