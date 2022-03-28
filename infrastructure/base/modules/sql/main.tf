resource "google_project_service" "sql_api" {
  service = "sqladmin.googleapis.com"
  disable_on_destroy = false

  depends_on = [google_project_service.compute_engine_api]
}

resource "google_project_service" "compute_engine_api" {
  service = "compute.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "service_networking_api" {
  service  = "servicenetworking.googleapis.com"
  disable_on_destroy = false
}

resource "google_compute_global_address" "private_ip_address" {
  provider = google-beta

  name          = "private-ip-address"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 16
  network       = var.network_id
}

resource "google_service_networking_connection" "private_vpc_connection" {
  provider = google-beta

  network                 = var.network_id
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.private_ip_address.name]

  depends_on = [google_project_service.service_networking_api]
}

locals {
  postgres_user = var.database_user
  postgres_database = var.database_name
  postgres_password = var.database_password

}

resource "google_sql_database_instance" "db-main" {
  name             = var.name
  database_version = var.database_version
  region           = var.region

  settings {
    tier = var.sql-database-instance-tier
    ip_configuration {
      ipv4_enabled    = false
      private_network = var.network_id
    }

    backup_configuration {
      enabled = var.enable_backups
      start_time = "05:00"

      backup_retention_settings {
        retained_backups = 30
      }
    }
  }

  depends_on = [google_project_service.sql_api, google_service_networking_connection.private_vpc_connection]
}

resource "google_sql_database" "database" {
  name     = local.postgres_database
  instance = google_sql_database_instance.db-main.name
}

resource "google_sql_user" "app-user" {
  name     = local.postgres_user
  instance = google_sql_database_instance.db-main.name
  password = local.postgres_password
}
