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
    NEXTAUTH_URL    = "https://${var.domain}"
  }
  backend_docker_build_args = {
    TRANSIFEX_TOKEN = var.transifex_token
  }
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
  env_vars           = [
    {
      name  = "NEXT_PUBLIC_API_URL"
      value = "https://${var.domain}/backend"
    },
    {
      name  = "NEXT_PUBLIC_GOOGLE_ANALYTICS"
      value = var.google_analytics_key
    },
    {
      name  = "NEXT_PUBLIC_DOMAIN"
      value = "https://${var.domain}"
    }
  ]
}

module "backend_cloudrun" {
  source             = "./modules/cloudrun"
  name               = "backend"
  region             = var.gcp_region
  project_id         = var.gcp_project_id
  image_name         = "backend"
  container_port     = 4000
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
  env_vars = [
    {
      name  = "DATABASE_NAME"
      value = "heco"
    },
    {
      name  = "DATABASE_USER"
      value = "heco"
    },
    {
      name  = "DATABASE_HOST"
      value = module.database.database_host
    },
    {
      name = "GCP_STORAGE_BUCKET"
      value = module.backend_storage.bucket_name
    },
    {
      name = "BACKEND_URL"
      value = "https://${var.domain}/backend"
    }
  ]
}

module "backend_storage" {
  source                = "./modules/storage"
  region                = var.gcp_region
  project_id            = var.gcp_project_id
  service_account_email = module.backend_cloudrun.service_account_email
  name                  = "heco-site-storage"
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

module "dns" {
  source = "./modules/dns"
  domain = var.domain
  name   = "heco"
}

module "load_balancer" {
  source                  = "./modules/load-balancer"
  region                  = var.gcp_region
  project                 = var.gcp_project_id
  name                    = "heco"
  backend_cloud_run_name  = module.backend_cloudrun.name
  frontend_cloud_run_name = module.frontend_cloudrun.name
  domain                  = var.domain
  dns_managed_zone_name   = module.dns.dns_zone_name
}
