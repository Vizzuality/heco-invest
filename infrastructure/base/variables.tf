variable "github_org" {
  type        = string
  description = "Github organization"
}

variable "github_project" {
  type        = string
  description = "Github project name"
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
