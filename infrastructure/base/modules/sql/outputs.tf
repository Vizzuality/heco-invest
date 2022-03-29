output "database_host" {
  value = google_sql_database_instance.db-main.private_ip_address
}

output "database" {
  value = google_sql_database.database
}
