data "google_project" "project" {
}

resource "google_project_service" "cloud_run_api" {
  service    = "run.googleapis.com"
  disable_on_destroy = false
}

resource "google_secret_manager_secret_iam_member" "secret_access" {
  count = length(var.secrets)

  secret_id = var.secrets[count.index]["secret_name"]
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${data.google_project.project.number}-compute@developer.gserviceaccount.com"
}

resource "google_cloud_run_service" "cloud_run" {
  name     = var.name
  location = var.region

  template {
    spec {
      containers {
        image = "gcr.io/${var.project_id}/${var.image_name}:latest"
        args = [var.start_command]
        ports {
          container_port = var.container_port
        }

        dynamic "env" {
          for_each = var.secrets
          content {
            name = env.value["name"]
            value_from {
              secret_key_ref {
                key  = "latest"
                name = env.value["secret_name"]
              }
            }
          }
        }

        dynamic "env" {
          for_each = var.env_vars
          content {
            name = env.key
            value = env.value
          }
        }
      }
    }
  }

  metadata {
    annotations = {
      # Limit scale up to prevent any cost blow outs!
      "autoscaling.knative.dev/maxScale" = "5"
      # Use the VPC Connector
      "run.googleapis.com/vpc-access-connector" = var.vpc_connector_name
      # all egress from the service should go through the VPC Connector
      "run.googleapis.com/vpc-access-egress" = "all"
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [google_secret_manager_secret_iam_member.secret_access]
}

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location    = google_cloud_run_service.cloud_run.location
  project     = google_cloud_run_service.cloud_run.project
  service     = google_cloud_run_service.cloud_run.name

  policy_data = data.google_iam_policy.noauth.policy_data
}
