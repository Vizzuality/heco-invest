variable "name" {
  type = string
}

variable "region" {
  type        = string
  description = "GCP region"
}

variable "github_branch" {
  type = string
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

variable "dockerfile_path" {
  type        = string
  description = "Path within the repo for the Dockerfile to build"
  default = "./Dockerfile"
}

variable "docker_context_path" {
  type        = string
  description = "Path within the repo for the Docker context to build"
  default = "."
}

variable "docker_build_args" {
  description = "Key-value pairs of env vars and their values"
  default = {}
}
