output "staging_dns_name_servers" {
  value = module.staging.dns_name_servers
}

output "staging_site_url" {
  value = module.staging.site_url
}

output "staging_api_url" {
  value = module.staging.api_url
}

output "production_dns_name_servers" {
  value = module.production.dns_name_servers
}

output "production_site_url" {
  value = module.production.site_url
}

output "production_api_url" {
  value = module.production.api_url
}
