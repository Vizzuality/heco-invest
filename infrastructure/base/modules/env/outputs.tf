output "dns_name_servers" {
  value = module.dns.dns_name_servers
}

output "site_url" {
  value = var.domain
}

output "api_url" {
  value = "${var.domain}/backend"
}
