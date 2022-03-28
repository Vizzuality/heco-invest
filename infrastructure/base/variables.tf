variable "github_org" {
  type        = string
  description = "Github organization"
}

variable "github_project" {
  type        = string
  description = "Github project name"
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

variable "bucket_name" {
  type        = string
  description = "The name of the Google Storage Bucket to create"
}

variable "tf_state_prefix" {
  type        = string
  default     = "state"
  description = "The prefix for the TF state in the Google Storage Bucket"
}

variable "storage_class" {
  type        = string
  default     = "STANDARD"
  description = "The storage class of the Storage Bucket to create"
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
