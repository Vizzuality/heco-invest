resource "google_project_service" "compute_api" {
  service  = "compute.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "vpcaccess_api" {
  service  = "vpcaccess.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "servicenetwork_api" {
  service  = "servicenetworking.googleapis.com"
  disable_on_destroy = false
}

resource "google_compute_network" "network" {
  name                    = "heco-network"
  auto_create_subnetworks = "false"

  depends_on = [google_project_service.compute_api]
}

resource "google_compute_subnetwork" "private" {
  name                       = "heco-private-subnet"
  ip_cidr_range              = "10.0.0.0/20"
  network                    = google_compute_network.network.self_link
  region                     = var.region
  private_ip_google_access   = true
}

resource "google_compute_router" "router" {
  name     = "heco-cloud-router"
  region   = var.region
  network  = google_compute_network.network.id
}

resource "google_compute_router_nat" "router_nat" {
  name                               = "heco-nat-gateway"
  region                             = var.region
  router                             = google_compute_router.router.name
  source_subnetwork_ip_ranges_to_nat = "ALL_SUBNETWORKS_ALL_IP_RANGES"
  nat_ip_allocate_option             = "AUTO_ONLY"
}

resource "google_compute_firewall" "web_ingress" {
  name    = "allow-web-ingress"
  network = google_compute_network.network.name

  direction = "INGRESS"

  source_ranges = ["0.0.0.0/0"]
  allow {
    protocol = "tcp"
    ports    = ["80", "443"]
  }
}

resource "google_vpc_access_connector" "connector" {
  name          = "vpc-conn"
  provider      = google-beta
  region        = var.region
  ip_cidr_range = "10.0.16.0/28"
  network       = google_compute_network.network.name
  depends_on    = [google_project_service.vpcaccess_api]
}

