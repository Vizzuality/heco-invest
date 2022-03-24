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

variable "env_vars" {
  type = list(object({
    name = string
    value = string
  }))
  description = "List of env vars to make available to the container"
}

variable "secrets" {
  type = list(object({
    name = string
    secret_name = string
  }))
  description = "List of secrets to make available to the container"
}
