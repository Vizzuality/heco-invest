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
