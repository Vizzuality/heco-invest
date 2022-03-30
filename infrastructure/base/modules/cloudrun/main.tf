data "google_project" "project" {
}

resource "google_project_service" "cloud_run_api" {
  service            = "run.googleapis.com"
  disable_on_destroy = false
}

resource "google_service_account" "service_account" {
  account_id   = "${var.name}-cr-sa"
  display_name = "${var.name} Service Account"
}

resource "google_secret_manager_secret_iam_member" "secret_access" {
  count = length(var.secrets)

  secret_id = var.secrets[count.index]["secret_name"]
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.service_account.email}"

  depends_on = [google_service_account.service_account]
}

resource "google_cloud_run_service" "cloud_run" {
  name     = var.name
  location = var.region

  template {
    spec {
      service_account_name = google_service_account.service_account.email

      containers {
        image = "gcr.io/${var.project_id}/${var.image_name}:latest"
        args  = [var.start_command]
        ports {
          container_port = var.container_port
        }

        dynamic "env" {
          for_each = concat(var.env_vars, var.secrets)
          content {
            name = env.value["name"]
            dynamic "value_from" {
              for_each = lookup(env.value, "secret_name", null) != null ? [1] : []
              content {
                secret_key_ref {

                  key  = "latest"
                  name = env.value["secret_name"]
                }
              }

            }
            value = lookup(env.value, "value", null) != null ? env.value["value"] : null
          }
        }
      }
    }
    metadata {
      annotations = {
        # Limit scale up to prevent any cost blow outs!
        "autoscaling.knative.dev/maxScale"        = "5"
        # Use the VPC Connector
        "run.googleapis.com/vpc-access-connector" = var.vpc_connector_name
        # all egress from the service should go through the VPC Connector
        "run.googleapis.com/vpc-access-egress"    = "all"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  autogenerate_revision_name = true

  depends_on = [google_secret_manager_secret_iam_member.secret_access, var.database]
}

data "google_iam_policy" "noauth" {
  binding {
    role    = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location = google_cloud_run_service.cloud_run.location
  project  = google_cloud_run_service.cloud_run.project
  service  = google_cloud_run_service.cloud_run.name

  policy_data = data.google_iam_policy.noauth.policy_data
}
