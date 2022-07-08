variable "project" {
  type        = string
  description = "The GCP project to deploy service into"
}

variable "domain" {
  type = string
  description = "Base domain for the DNS zone"
}

variable "dns_managed_zone_name" {
  type = string
  description = "Name of the DNS Zone"
}

variable "cname_records_map" {
  description = "key-value pairs of CNAME records to create"
}
