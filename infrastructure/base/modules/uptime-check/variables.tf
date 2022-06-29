variable "name" {
  type = string
}

variable "host" {
  type = string
}

variable "path" {
  type = string
  default = ""
}

variable "period" {
  type = string
  default = "300s"
}

variable "email" {
  type = string
}
