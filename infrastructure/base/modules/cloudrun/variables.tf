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

variable "start_command" {
  type        = string
  description = "Docker image start command"
}

variable "container_port" {
  type        = number
  description = "Port in which the running service is running"
}

variable "database" {
  description = "The database object to use with depends_on"
}

variable "env_vars" {
  type = list(object({
    name = string
    value = string
  }))
  description = "Key-value pairs of env vars to make available to the container"
  default = []
}

variable "secrets" {
  type = list(object({
    name = string
    secret_name = string
  }))
  description = "List of secrets to make available to the container"
  default = []
}

variable "vpc_connector_name" {
  type = string
  description = "Name of the VPC Access Connector"
}
