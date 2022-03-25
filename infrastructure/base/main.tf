terraform {
  backend "gcs" {
    bucket = "heco-sandbox-tf-state" // TF does not allow vars here. Use the value from var.bucket_name
    prefix = "state" // TF does not allow vars here. Use the value from var.tf_state_prefix
  }
}

module "network" {
  source     = "./modules/network"
  project_id = var.gcp_project_id
  region     = var.gcp_region
}

module "frontend_gcr" {
  source     = "./modules/gcr"
  project_id = var.gcp_project_id
  region     = var.gcp_region
  name       = "frontend"
}

module "backend_gcr" {
  source     = "./modules/gcr"
  project_id = var.gcp_project_id
  region     = var.gcp_region
  name       = "backend"
}
module "rails_secret_key_base" {
  source              = "./modules/secret_value"
  region              = var.gcp_region
  key                 = "rails_secret_key_base"
  random_value_length = 64
  use_random_value    = true
}

module "postgres_application_user_password" {
  source           = "./modules/secret_value"
  region           = var.gcp_region
  key              = "heco_postgres_user_password"
  use_random_value = true
}

locals {
  frontend_docker_build_args = {
    TRANSIFEX_TOKEN = var.transifex_token
  }
  backend_docker_build_args = {}
}

module "frontend_build" {
  source                 = "./modules/cloudbuild"
  name                   = "frontend"
  region                 = var.gcp_region
  project_id             = var.gcp_project_id
  github_branch          = "infrastructure-basics"
  github_org             = var.github_org
  github_project         = var.github_project
  image_name             = "frontend"
  dockerfile_path        = "./frontend/Dockerfile"
  docker_context_path    = "./frontend"
  docker_build_args      = local.frontend_docker_build_args
  cloud_run_service_name = "frontend"
}

module "backend_build" {
  source                 = "./modules/cloudbuild"
  name                   = "backend"
  region                 = var.gcp_region
  project_id             = var.gcp_project_id
  github_branch          = "infrastructure-basics"
  github_org             = var.github_org
  github_project         = var.github_project
  image_name             = "backend"
  dockerfile_path        = "./backend/Dockerfile"
  docker_context_path    = "./backend"
  docker_build_args      = local.backend_docker_build_args
  cloud_run_service_name = "backend"
}

module "frontend_cloudrun" {
  source             = "./modules/cloudrun"
  name               = "frontend"
  region             = var.gcp_region
  project_id         = var.gcp_project_id
  image_name         = "frontend"
  container_port     = 3000
  start_command      = "start:prod"
  vpc_connector_name = module.network.vpc_access_connector_name
  env_vars           = {}
}

module "backend_cloudrun" {
  source             = "./modules/cloudrun"
  name               = "backend"
  region             = var.gcp_region
  project_id         = var.gcp_project_id
  image_name         = "backend"
  container_port     = 3000
  start_command      = "start"
  vpc_connector_name = module.network.vpc_access_connector_name
  secrets            = [
    {
      name        = "SECRET_KEY_BASE"
      secret_name = module.rails_secret_key_base.secret_name
    }, {
      name        = "DATABASE_PASSWORD"
      secret_name = module.postgres_application_user_password.secret_name
    }
  ]
  env_vars = {
    "DATABASE_NAME" = "heco"
    DATABASE_USER = "heco"
    DATABASE_HOST = module.database.database_host
  }
}

module "database" {
  source            = "./modules/sql"
  name              = "heco"
  region            = var.gcp_region
  database_name     = "heco"
  database_user     = "heco"
  database_password = module.postgres_application_user_password.secret_value
  network_id        = module.network.network_id
}
