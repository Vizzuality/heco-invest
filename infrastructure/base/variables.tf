variable "github_org" {
  type        = string
  description = "Github organization"
}

variable "github_project" {
  type        = string
  description = "Github project name"
}

variable "staging_project_name" {
  type        = string
  description = "Name of the staging project"
}

variable "production_project_name" {
  type        = string
  description = "Name of the production project"
}

# define GCP region
variable "gcp_region" {
  type        = string
  description = "GCP region"
}

# define GCP zone
variable "gcp_zone" {
  type        = string
  description = "GCP zone"
}

# define GCP project id
variable "gcp_project_id" {
  type        = string
  description = "GCP project id"
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
}

variable "domain" {
  type = string
  description = "Base domain for the DNS zone"
}

variable "uptime_alert_email" {
  type        = string
  description = "Email address to which uptime alerts should be sent"
}

variable "redirect_domain" {
  type = string
  description = "Legacy domain to redirect"
}

variable "from_email_address" {
  type = string
  description = "Email address from which to send emails"
}

variable "staging_http_auth_username" {
  type = string
  description = "Http auth username (for staging)"
  default = ""
}

variable "staging_http_auth_password" {
  type = string
  description = "Http auth password (for staging)"
  default = ""
}
