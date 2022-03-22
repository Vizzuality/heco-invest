variable "name" {
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

variable "image_name" {
  type        = string
  description = "Docker image name"
}
