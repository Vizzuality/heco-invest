output "network_id" {
  value = google_compute_network.network.id
}

output "vpc_access_connector_name" {
  value = google_vpc_access_connector.connector.name
}
