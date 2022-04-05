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

variable "domain" {
  type = string
  description = "Base domain for the DNS zone"
}
