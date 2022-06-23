variable "name" {
  type = string
}

variable "time_zone" {
  type = string
  default = "Europe/Madrid"
}

variable "schedule" {
  type = string
  default = "* * 1 * *"
}

variable "uri" {
  type = string
}

variable "service_account_email" {
  type = string
}

variable "http_method" {
  type = string
  default = "POST"
}
