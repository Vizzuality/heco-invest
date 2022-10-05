variable "name" {
  type = string
}

variable "prefix" {
  type = string
}

variable "region" {
  type        = string
  description = "GCP region"
}

variable "project_id" {
  type        = string
  description = "GCP project id"
}

variable "backend_service_account_email" {
  type        = string
  description = "Email address of the backend service account to grant access to cloud tasks"
}

variable "jobs_service_account_email" {
  type        = string
  description = "Email address of the jobs service account to grant access to cloud tasks"
}
