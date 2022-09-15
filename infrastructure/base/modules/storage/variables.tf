variable "project_id" {
  type        = string
  description = "GCP project id"
}

variable "region" {
  type        = string
  description = "GCP region"
}

variable "name" {
  type        = string
  description = "Repository name"
}

variable "storage_class" {
  type        = string
  default     = "STANDARD"
  description = "The storage class of the Storage Bucket to create"
}

variable "backend_service_account_email" {
  type        = string
  description = "Email address of the backend instance service account to grant read/write permissions to"
}

variable "jobs_service_account_email" {
  type        = string
  description = "Email address of the jobs instance service account to grant read/write permissions to"
}

variable "domain" {
  type = string
  description = "Domain for CORS config"
}

variable "cors_origin" {
  type = string
  description = "Origin for CORS config"
  default = "*"
}
