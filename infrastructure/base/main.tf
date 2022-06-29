terraform {
  backend "gcs" {
    // TF does not allow vars here. Use the value from var.bucket_name from the remote-state project
    bucket = "heco-tf-state"
    // TF does not allow vars here. Use the value from var.tf_state_prefix
    prefix = "state"
  }
}

module "staging" {
  source               = "./modules/env"
  domain               = "staging.${var.domain}"
  gcp_project_id       = var.gcp_project_id
  gcp_region           = var.gcp_region
  github_org           = var.github_org
  github_project       = var.github_project
  github_branch        = "develop"
  google_analytics_key = var.google_analytics_key
  google_maps_api_key  = var.google_maps_api_key
  project_name         = var.staging_project_name
  transifex_token      = var.transifex_token
  sendgrid_api_key     = var.sendgrid_api_key
  mapbox_api_key       = var.mapbox_api_key
  uptime_alert_email   = var.uptime_alert_email
}

module "production" {
  source               = "./modules/env"
  domain               = var.domain
  gcp_project_id       = var.gcp_project_id
  gcp_region           = var.gcp_region
  github_org           = var.github_org
  github_project       = var.github_project
  github_branch        = "main"
  google_analytics_key = var.google_analytics_key
  google_maps_api_key  = var.google_maps_api_key
  project_name         = var.production_project_name
  transifex_token      = var.transifex_token
  sendgrid_api_key     = var.sendgrid_api_key
  mapbox_api_key       = var.mapbox_api_key
  frontend_min_scale   = 1
  backend_min_scale    = 1
  cors_origin          = "https://${var.domain}"
  uptime_alert_email   = var.uptime_alert_email
}
