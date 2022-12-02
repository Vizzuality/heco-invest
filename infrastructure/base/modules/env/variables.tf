variable "github_org" {
  type        = string
  description = "Github organization"
}

variable "github_project" {
  type        = string
  description = "Github project name"
}

variable "github_branch" {
  type        = string
  description = "Github project branch"
}

variable "project_name" {
  type        = string
  description = "Name of the project"
}

# define GCP region
variable "gcp_region" {
  type        = string
  description = "GCP region"
}

# define GCP project id
variable "gcp_project_id" {
  type        = string
  description = "GCP project id"
}

variable "tf_state_prefix" {
  type        = string
  default     = "state"
  description = "The prefix for the TF state in the Google Storage Bucket"
}

variable "transifex_token" {
  type = string
  description = "Transifex API access token"
}

variable "sendgrid_api_key" {
  type = string
  description = "SendGrid API key"
}

variable "google_analytics_key" {
  type = string
  description = "Google Analytics key"
}

variable "google_maps_api_key" {
  type = string
  description = "Google Maps API key"
}

variable "mapbox_api_key" {
  type = string
  description = "Mapbox API key"
}

variable "hotjar_site_id" {
  type = string
  description = "Hotjar site ID"
  default = ""
}

variable "http_auth_username" {
  type = string
  description = "Http auth username (for staging)"
}

variable "http_auth_password" {
  type = string
  description = "Http auth password (for staging)"
}

variable "dns_zone_name" {
  type        = string
  description = "Name for the GCP DNS Zone"
}

variable "redirect_dns_zone_name" {
  type        = string
  description = "Name for the GCP redirect DNS Zone"
}

variable "domain" {
  type = string
  description = "Base domain for the DNS zone"
}

variable "redirect_domain" {
  type = string
  description = "Legacy domain to redirect"
}

variable "subdomain" {
  type = string
  default = ""
  description = "If set, it will be prepended to the domain to form a subdomain."
}

variable "frontend_min_scale" {
  type = number
  description = "Minimum number of frontend app instances to deploy"
  default = 0
}

variable "frontend_max_scale" {
  type = number
  description = "Maximum number of frontend app instances to deploy"
  default = 5
}

variable "backend_min_scale" {
  type = number
  description = "Minimum number of backend app instances to deploy"
  default = 0
}

variable "backend_max_scale" {
  type = number
  description = "Maximum number of backend app instances to deploy"
  default = 5
}

variable "cors_origin" {
  type = string
  description = "Origin for CORS config"
  default = "*"
}

variable "uptime_alert_email" {
  type = string
  description = "Email address to which uptime alerts should be sent"
}

variable "from_email_address" {
  type = string
  description = "Email address from which to send emails"
}

variable "instance_role" {
  type = string
  default = "production"
  description = "staging|production, NOT the same as RAILS_ENV as that is 'production' in staging as well"
}

variable "tag" {
  type = string
  description = "Tag name to use for docker image tagging and deployment"
}

variable "klab_api_host" {
  type = string
  description = "Klab engine API host"
}

variable "klab_api_username" {
  type = string
  description = "Klab engine API username"
}

variable "klab_api_password" {
  type = string
  description = "Klab engine API password"
}
