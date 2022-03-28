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

variable "github_org" {
  type        = string
  description = "Github organization"
}

variable "github_project" {
  type        = string
  description = "Github project name"
}

variable "github_branch" {
  type = string
}
