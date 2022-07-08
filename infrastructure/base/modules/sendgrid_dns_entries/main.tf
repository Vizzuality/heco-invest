resource "google_dns_record_set" "sendgrid-dns-record-set" {
  for_each = var.cname_records_map

  project      = var.project
  name         = each.key
  type         = "CNAME"
  ttl          = 3600
  managed_zone = var.dns_managed_zone_name
  rrdatas      = [each.value]
}
