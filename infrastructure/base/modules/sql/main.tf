resource "google_project_service" "sql_api" {
  service = "sqladmin.googleapis.com"
  disable_on_destroy = false

  depends_on = [google_project_service.compute_engine_api]
}

resource "google_project_service" "compute_engine_api" {
  service = "compute.googleapis.com"
  disable_on_destroy = false
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
  }

  depends_on = [google_project_service.sql_api]
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
