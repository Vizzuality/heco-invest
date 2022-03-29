terraform {
  backend "gcs" {
    bucket = "heco-tf-state" // TF does not allow vars here. Use the value from var.bucket_name from the remote-state project
    prefix = "state" // TF does not allow vars here. Use the value from var.tf_state_prefix
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
  project_name         = var.staging_project_name
  transifex_token      = var.transifex_token
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
  project_name         = var.production_project_name
  transifex_token      = var.transifex_token
}
