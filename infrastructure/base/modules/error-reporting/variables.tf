variable "project_id" {
  type        = string
  description = "GCP project id"
}

variable "service_account_email" {
  type        = string
  description = "Email address of the service account to grant cloud tasks access to"
}
