module "network" {
  source     = "../network"
  project_id = var.gcp_project_id
  region     = var.gcp_region
  name       = var.project_name
}

module "frontend_gcr" {
  source     = "../gcr"
  project_id = var.gcp_project_id
  region     = var.gcp_region
  name       = "${var.project_name}-frontend"
}

module "backend_gcr" {
  source     = "../gcr"
  project_id = var.gcp_project_id
  region     = var.gcp_region
  name       = "${var.project_name}-backend"
}

module "rails_secret_key_base" {
  source              = "../secret_value"
  region              = var.gcp_region
  key                 = "${var.project_name}-rails_secret_key_base"
  random_value_length = 64
  use_random_value    = true
}

module "postgres_application_user_password" {
  source           = "../secret_value"
  region           = var.gcp_region
  key              = "${var.project_name}_postgres_user_password"
  use_random_value = true
}

module "transifex_api_key" {
  source           = "../secret_value"
  region           = var.gcp_region
  key              = "${var.project_name}_transifex_api_key"
  value            = var.transifex_token
  use_random_value = false
}

module "sendgrid_api_key" {
  source           = "../secret_value"
  region           = var.gcp_region
  key              = "${var.project_name}_sendgrid_api_key"
  value            = var.sendgrid_api_key
  use_random_value = false
}

locals {
  frontend_docker_build_args = {
    TRANSIFEX_TOKEN = var.transifex_token
    NEXT_PUBLIC_FRONTEND_URL = "https://${var.domain}"
    NEXT_PUBLIC_BACKEND_URL = "https://${var.domain}/backend"
    NEXT_PUBLIC_GOOGLE_ANALYTICS = var.google_analytics_key
    NEXT_PUBLIC_PROXY_BACKEND = "false"
  }
}

module "frontend_build" {
  source                 = "../cloudbuild"
  project_name           = var.project_name
  deployment_name        = "frontend"
  region                 = var.gcp_region
  project_id             = var.gcp_project_id
  github_branch          = var.github_branch
  github_org             = var.github_org
  github_project         = var.github_project
  image_name             = "frontend"
  dockerfile_path        = "./frontend/Dockerfile"
  docker_context_path    = "./frontend"
  docker_build_args      = local.frontend_docker_build_args
  cloud_run_service_name = "${var.project_name}-frontend"
  test_container_name    = "frontend"
}

module "backend_build" {
  source                 = "../cloudbuild"
  project_name           = var.project_name
  deployment_name        = "backend"
  region                 = var.gcp_region
  project_id             = var.gcp_project_id
  github_branch          = var.github_branch
  github_org             = var.github_org
  github_project         = var.github_project
  image_name             = "backend"
  dockerfile_path        = "./backend/Dockerfile"
  docker_context_path    = "./backend"
  cloud_run_service_name = "${var.project_name}-backend"
  test_container_name    = "backend"
}

module "frontend_cloudrun" {
  source             = "../cloudrun"
  name               = "${var.project_name}-frontend"
  region             = var.gcp_region
  project_id         = var.gcp_project_id
  image_name         = "frontend"
  container_port     = 3000
  start_command      = "start:prod"
  vpc_connector_name = module.network.vpc_access_connector_name
  database           = module.database.database
  min_scale          = var.frontend_min_scale
  max_scale          = var.frontend_max_scale
}

module "backend_cloudrun" {
  source             = "../cloudrun"
  name               = "${var.project_name}-backend"
  region             = var.gcp_region
  project_id         = var.gcp_project_id
  image_name         = "backend"
  container_port     = 4000
  start_command      = "start"
  vpc_connector_name = module.network.vpc_access_connector_name
  database           = module.database.database
  min_scale          = var.backend_min_scale
  max_scale          = var.backend_max_scale
  secrets            = [
    {
      name        = "SECRET_KEY_BASE"
      secret_name = module.rails_secret_key_base.secret_name
    }, {
      name        = "DATABASE_PASSWORD"
      secret_name = module.postgres_application_user_password.secret_name
    }, {
      name        = "TX_TOKEN"
      secret_name = module.transifex_api_key.secret_name
    }, {
      name        = "SMTP_PASSWORD"
      secret_name = module.sendgrid_api_key.secret_name
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
      name  = "GCP_PROJECT_ID"
      value = var.gcp_project_id
    },
    {
      name  = "GCP_STORAGE_BUCKET"
      value = module.backend_storage.bucket_name
    },
    {
      name  = "BACKEND_URL"
      value = "https://${var.domain}/backend"
    },
    {
      name  = "RAILS_RELATIVE_URL_ROOT"
      value = "/backend"
    },
    {
      name  = "TEST_PUBSUB_TOPIC"
      value = module.test_pubsub.topic_name
    },
    {
      name  = "TEST_PUBSUB_SUBSCRIPTION"
      value = module.test_pubsub.subscription_name
    },
    {
      name  = "IS_API_INSTANCE"
      value = true
    },
    {
      name  = "IS_JOBS_INSTANCE"
      value = false
    },
    {
      name  = "SMTP_USERNAME"
      value = "apikey"
    },
    {
      name  = "SMTP_HOST"
      value = "smtp.sendgrid.net"
    },
    {
      name  = "SMTP_PORT"
      value = 587
    },
    {
      name  = "MAILER_DEFAULT_HOST"
      value = var.domain
    },
    {
      name  = "MAILER_DEFAULT_FROM"
      value = "agnieszka.figiel@vizzuality.com"
    }
  ]
}

module "backend_storage" {
  source                = "../storage"
  region                = var.gcp_region
  project_id            = var.gcp_project_id
  service_account_email = module.backend_cloudrun.service_account_email
  name                  = "${var.project_name}-site-storage"
  domain                = var.domain
  cors_origin           = var.cors_origin
}

module "database" {
  source            = "../sql"
  name              = var.project_name
  project_id        = var.gcp_project_id
  region            = var.gcp_region
  database_name     = "heco"
  database_user     = "heco"
  database_password = module.postgres_application_user_password.secret_value
  network_id        = module.network.network_id
}

module "bastion" {
  source          = "../bastion"
  name            = var.project_name
  project_id      = var.gcp_project_id
  subnetwork_name = module.network.subnetwork_name
}

module "test_pubsub" {
  source     = "../pubsub"
  name       = "${var.project_name}-test"
  project_id = var.gcp_project_id
  region     = var.gcp_region
}

module "dns" {
  source = "../dns"
  domain = var.domain
  name   = var.project_name
}

module "load_balancer" {
  source                  = "../load-balancer"
  region                  = var.gcp_region
  project                 = var.gcp_project_id
  name                    = var.project_name
  backend_cloud_run_name  = module.backend_cloudrun.name
  frontend_cloud_run_name = module.frontend_cloudrun.name
  domain                  = var.domain
  dns_managed_zone_name   = module.dns.dns_zone_name
}

module "translation" {
  source                  = "../translation"
}
