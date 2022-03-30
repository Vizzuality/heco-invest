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

variable "google_analytics_key" {
  type = string
  description = "Google Analytics key"
}

variable "domain" {
  type = string
  description = "Base domain for the DNS zone"
}
