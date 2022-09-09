locals {
  domain          = var.subdomain == "" ? var.domain : "${var.subdomain}.${var.domain}"
  redirect_domain = var.subdomain == "" ? var.redirect_domain : "${var.subdomain}.${var.redirect_domain}"
}

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

module "rails_encryption_primary_key" {
  source              = "../secret_value"
  region              = var.gcp_region
  key                 = "${var.project_name}-rails_encryption_primary_key"
  random_value_length = 32
  use_random_value    = true
}

module "rails_encryption_deterministic_key" {
  source              = "../secret_value"
  region              = var.gcp_region
  key                 = "${var.project_name}-rails_encryption_deterministic_key"
  random_value_length = 32
  use_random_value    = true
}

module "rails_encryption_derivation_salt" {
  source              = "../secret_value"
  region              = var.gcp_region
  key                 = "${var.project_name}-rails_encryption_derivation_salt"
  random_value_length = 32
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

# checking for presence of http_auth_password to know if basic auth required
module "http_auth_password" {
  count            = length(var.http_auth_password) > 0 ? 1 : 0

  source           = "../secret_value"
  region           = var.gcp_region
  key              = "${var.project_name}_http_auth_password"
  value            = var.http_auth_password
  use_random_value = false
}

# checking for presence of http_auth_password to know if basic auth required
module "nextauth_secret" {
  count            = length(var.http_auth_password) > 0 ? 1 : 0

  source              = "../secret_value"
  region              = var.gcp_region
  key                 = "${var.project_name}-nextauth_secret"
  random_value_length = 32
  use_random_value    = true
}

locals {
  frontend_docker_build_args = {
    TRANSIFEX_TOKEN                 = var.transifex_token
    NEXT_PUBLIC_FRONTEND_URL        = "https://${local.domain}"
    NEXT_PUBLIC_BACKEND_URL         = "https://${local.domain}/backend"
    NEXT_PUBLIC_GOOGLE_ANALYTICS    = var.google_analytics_key
    NEXT_PUBLIC_PROXY_BACKEND       = "false"
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = var.google_maps_api_key
    NEXT_PUBLIC_MAPBOX_API_TOKEN    = var.mapbox_api_key
    NEXT_PUBLIC_HOTJAR_SITE_ID      = var.hotjar_site_id
  }
  backend_docker_build_args = {
    RAILS_RELATIVE_URL_ROOT = "/backend"
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
  tag                    = var.tag
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
  docker_build_args      = local.backend_docker_build_args
  cloud_run_service_name = "${var.project_name}-backend"
  test_container_name    = "backend"
  tag                    = var.tag
  additional_steps       = [
    {
      name       = "gcr.io/google.com/cloudsdktool/cloud-sdk"
      entrypoint = "gcloud"
      args       = [
        "run", "deploy", "${var.project_name}-jobs", "--image", "gcr.io/${var.gcp_project_id}/backend:${var.tag}",
        "--region", var.gcp_region
      ]
    }
  ]
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
  tag                = var.tag
  secrets            = flatten([
    length(module.http_auth_password) > 0 ? [{
      name        = "HTTP_AUTH_PASSWORD"
      secret_name = module.http_auth_password[0].secret_name
    }] : [],
    length(module.http_auth_password) > 0 ? [{
      name        = "NEXTAUTH_SECRET"
      secret_name = module.nextauth_secret[0].secret_name
    }] : []
  ])
  env_vars = flatten([
    {
      name  = "HTTP_AUTH_USERNAME"
      value = var.http_auth_username
    },
    length(module.http_auth_password) > 0 ? [{
      name  = "NEXTAUTH_URL"
      value = "https://${local.domain}"
    }] : []
  ])
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
  tag                = var.tag
  secrets            = flatten([
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
    }, {
      name        = "ENCRYPTION_PRIMARY_KEY"
      secret_name = module.rails_encryption_primary_key.secret_name
    }, {
      name        = "ENCRYPTION_DETERMINISTIC_KEY"
      secret_name = module.rails_encryption_deterministic_key.secret_name
    }, {
      name        = "ENCRYPTION_DERIVATION_SALT"
      secret_name = module.rails_encryption_derivation_salt.secret_name
    }, length(module.http_auth_password) > 0 ? [{
      name        = "HTTP_AUTH_PASSWORD"
      secret_name = module.http_auth_password[0].secret_name
    }] : []
  ])
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
      name  = "GCP_STORAGE_BUCKET"
      value = module.backend_storage.bucket_name
    },
    {
      name  = "BACKEND_URL"
      value = "https://${local.domain}/backend"
    },
    {
      name  = "FRONTEND_URL"
      value = "https://${local.domain}"
    },
    {
      name  = "RAILS_RELATIVE_URL_ROOT"
      value = "/backend"
    },
    {
      name  = "CLOUDTASKER_PROCESSOR_HOST"
      value = module.jobs_cloudrun.cloudrun_service_url
    },
    {
      name  = "CLOUDTASKER_PROCESSOR_PATH"
      value = "/backend/cloudtasker/run"
    },
    {
      name  = "CLOUD_TASKS_QUEUE_PREFIX"
      value = var.project_name
    },
    {
      name  = "CLOUD_TASKS_TEST_QUEUE_NAME"
      value = "heco-default-queue"
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
      value = local.domain
    },
    {
      name  = "MAILER_DEFAULT_FROM"
      value = var.from_email_address
    },
    {
      name  = "GCP_PROJECT_ID"
      value = var.gcp_project_id
    },
    {
      name  = "GCP_REGION"
      value = var.gcp_region
    },
    {
      name  = "INSTANCE_ROLE"
      value = var.instance_role
    },
    {
      name  = "HTTP_AUTH_USERNAME"
      value = var.http_auth_username
    },
    {
      name  = "KLAB_API_HOST"
      value = var.klab_api_host
    },
    {
      name  = "KLAB_API_USERNAME"
      value = var.klab_api_username
    },
    {
      name  = "KLAB_API_PASSWORD"
      value = var.klab_api_password
    }
  ]
}

module "jobs_cloudrun" {
  source             = "../cloudrun"
  name               = "${var.project_name}-jobs"
  region             = var.gcp_region
  project_id         = var.gcp_project_id
  image_name         = "backend"
  container_port     = 4000
  start_command      = "start"
  vpc_connector_name = module.network.vpc_access_connector_name
  database           = module.database.database
  min_scale          = var.backend_min_scale
  max_scale          = var.backend_max_scale
  tag                = var.tag
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
    }, {
      name        = "ENCRYPTION_PRIMARY_KEY"
      secret_name = module.rails_encryption_primary_key.secret_name
    }, {
      name        = "ENCRYPTION_DETERMINISTIC_KEY"
      secret_name = module.rails_encryption_deterministic_key.secret_name
    }, {
      name        = "ENCRYPTION_DERIVATION_SALT"
      secret_name = module.rails_encryption_derivation_salt.secret_name
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
      name  = "GCP_STORAGE_BUCKET"
      value = module.backend_storage.bucket_name
    },
    {
      name  = "BACKEND_URL"
      value = "https://${local.domain}/backend"
    },
    {
      name  = "FRONTEND_URL"
      value = "https://${local.domain}"
    },
    {
      name  = "RAILS_RELATIVE_URL_ROOT"
      value = "/backend"
    },
    {
      name  = "CLOUDTASKER_PROCESSOR_HOST"
      value = "https://${local.domain}"
    },
    {
      name  = "CLOUDTASKER_PROCESSOR_PATH"
      value = "/backend/cloudtasker/run"
    },
    {
      name  = "CLOUD_TASKS_QUEUE_PREFIX"
      value = var.project_name
    },
    {
      name  = "CLOUD_TASKS_TEST_QUEUE_NAME"
      value = "heco-default-queue"
    },
    {
      name  = "IS_JOBS_INSTANCE"
      value = true
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
      value = local.domain
    },
    {
      name  = "MAILER_DEFAULT_FROM"
      value = var.from_email_address
    },
    {
      name  = "GCP_PROJECT_ID"
      value = var.gcp_project_id
    },
    {
      name  = "GCP_REGION"
      value = var.gcp_region
    },
    {
      name  = "INSTANCE_ROLE"
      value = var.instance_role
    },
    {
      name  = "KLAB_API_HOST"
      value = var.klab_api_host
    },
    {
      name  = "KLAB_API_USERNAME"
      value = var.klab_api_username
    },
    {
      name  = "KLAB_API_PASSWORD"
      value = var.klab_api_password
    }
  ]
}

module "backend_storage" {
  source                        = "../storage"
  region                        = var.gcp_region
  project_id                    = var.gcp_project_id
  backend_service_account_email = module.backend_cloudrun.service_account_email
  jobs_service_account_email    = module.jobs_cloudrun.service_account_email
  name                          = "${var.project_name}-site-storage"
  domain                        = local.domain
  cors_origin                   = var.cors_origin
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

module "cloud_tasks" {
  source                        = "../cloud-tasks"
  name                          = "heco-default-queue"
  prefix                        = var.project_name
  project_id                    = var.gcp_project_id
  region                        = var.gcp_region
  backend_service_account_email = module.backend_cloudrun.service_account_email
  jobs_service_account_email    = module.jobs_cloudrun.service_account_email
}

module "purge_users_cron" {
  source                = "../cloud-scheduler"
  name                  = "${var.project_name}-purge-users"
  uri                   = "${module.jobs_cloudrun.cloudrun_service_url}/backend/jobs/users/purge"
  service_account_email = module.jobs_cloudrun.service_account_email
}

module "close_open_calls_cron" {
  source                = "../cloud-scheduler"
  name                  = "${var.project_name}-close-open-calls"
  uri                   = "${module.jobs_cloudrun.cloudrun_service_url}/backend/jobs/open_calls/close_past_deadline"
  service_account_email = module.jobs_cloudrun.service_account_email
  schedule              = "0 1 * * *"
}

module "frontend_uptime_check" {
  source     = "../uptime-check"
  name       = "${var.project_name} Frontend"
  host       = var.domain
  email      = var.uptime_alert_email
  project_id = var.gcp_project_id
}

module "api_uptime_check" {
  source     = "../uptime-check"
  name       = "${var.project_name} API"
  host       = var.domain
  path       = "/backend/health_check"
  email      = var.uptime_alert_email
  project_id = var.gcp_project_id
}

module "load_balancer" {
  source                                = "../load-balancer"
  region                                = var.gcp_region
  project                               = var.gcp_project_id
  name                                  = var.project_name
  backend_cloud_run_name                = module.backend_cloudrun.name
  frontend_cloud_run_name               = module.frontend_cloudrun.name
  domain                                = var.domain
  dns_managed_zone_name                 = var.dns_zone_name
  redirect_domain                       = var.redirect_domain
  redirect_domain_dns_managed_zone_name = var.redirect_dns_zone_name
  subdomain                             = var.subdomain
}

module "translation" {
  source                = "../translation"
  project_id            = var.gcp_project_id
  service_account_email = module.jobs_cloudrun.service_account_email
}

module "error_reporting" {
  source                        = "../error-reporting"
  project_id                    = var.gcp_project_id
  backend_service_account_email = module.backend_cloudrun.service_account_email
  jobs_service_account_email    = module.jobs_cloudrun.service_account_email
}
