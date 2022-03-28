// IP address
resource "google_compute_global_address" "ip_address" {
  name         = "${var.name}-load-balancer"
  ip_version   = "IPV4"
  address_type = "EXTERNAL"
}

# ------------------------------------------------------------------------------
# Load balancer config rules
# ------------------------------------------------------------------------------

# HTTPS + certificate handling
resource "google_compute_global_forwarding_rule" "load-balancer-forwarding-rule-https" {
  name                  = "load-balancer-forwarding-rule-https"
  target                = google_compute_target_https_proxy.load-balancer-https-proxy.id
  port_range            = "443"
  load_balancing_scheme = "EXTERNAL"
  ip_address            = google_compute_global_address.ip_address.address
}

resource "google_compute_target_https_proxy" "load-balancer-https-proxy" {
  name             = "load-balancer-https-proxy"
  url_map          = google_compute_url_map.load-balancer-url-map.id
  ssl_certificates = [google_compute_managed_ssl_certificate.load-balancer-certificate.id]
}

resource "google_compute_managed_ssl_certificate" "load-balancer-certificate" {
  name = "load-balancer-certificate"

  managed {
    domains = [var.domain, "api.${var.domain}"]
  }
}

# HTTP redirection to HTTPS
resource "google_compute_url_map" "http-redirect" {
  name = "http-redirect"

  default_url_redirect {
    redirect_response_code = "MOVED_PERMANENTLY_DEFAULT"  // 301 redirect
    strip_query            = false
    https_redirect         = true  // this is the magic
  }
}

resource "google_compute_target_http_proxy" "http-redirect" {
  name    = "http-redirect"
  url_map = google_compute_url_map.http-redirect.self_link
}

resource "google_compute_global_forwarding_rule" "http-redirect" {
  name       = "http-redirect"
  target     = google_compute_target_http_proxy.http-redirect.self_link
  ip_address = google_compute_global_address.ip_address.address
  port_range = "80"
}

# ------------------------------------------------------------------------------
# Load balancer core (URL mapping)
# ------------------------------------------------------------------------------
resource "google_compute_url_map" "load-balancer-url-map" {
  name            = "${var.name}-load-balancer"
  description     = "Load balancer for ${var.name}"
  default_service = google_compute_backend_service.frontend_service.id

  host_rule {
    hosts        = ["api.${var.domain}"]
    path_matcher = "api"
  }

  path_matcher {
    name            = "api"
    default_service = google_compute_backend_service.backend_service.id
  }
}

resource "google_compute_region_network_endpoint_group" "cloudrun_backend_neg" {
  provider              = google-beta
  name                  = "${var.name}-backend-neg"
  network_endpoint_type = "SERVERLESS"
  region                = var.region
  cloud_run {
    service = var.backend_cloud_run_name
  }
}

resource "google_compute_region_network_endpoint_group" "cloudrun_frontend_neg" {
  provider              = google-beta
  name                  = "${var.name}-frontend-neg"
  network_endpoint_type = "SERVERLESS"
  region                = var.region
  cloud_run {
    service = var.frontend_cloud_run_name
  }
}

resource "google_compute_backend_service" "backend_service" {
  name        = "backend-service"
  description = "Backend service"

  backend {
    group = google_compute_region_network_endpoint_group.cloudrun_backend_neg.id
  }

}

resource "google_compute_backend_service" "frontend_service" {
  name        = "frontend-service"
  description = "Frontend service"

  backend {
    group = google_compute_region_network_endpoint_group.cloudrun_frontend_neg.id
  }

}

# DNS config for the API
resource "google_dns_record_set" "api-dns-record-set" {
  project      = var.project
  name         = "api.${var.domain}."
  type         = "A"
  ttl          = 3600
  managed_zone = var.dns_managed_zone_name
  rrdatas      = [google_compute_global_address.ip_address.address]
}

# DNS config for the Frontend
resource "google_dns_record_set" "frontend-dns-record-set" {
  project      = var.project
  name         = "${var.domain}."
  type         = "A"
  ttl          = 3600
  managed_zone = var.dns_managed_zone_name
  rrdatas      = [google_compute_global_address.ip_address.address]
}
