terraform {
  backend "gcs" {
    bucket = "heco-tf-state" // TF does not allow vars here. Use the value from var.bucket_name
    prefix = "state" // TF does not allow vars here. Use the value from var.tf_state_prefix
  }
}

module "frontend_gcr" {
  source = "./modules/gcr"
  project_id = var.gcp_project_id
  region = var.gcp_region
  name = "frontend"
}


locals {
  frontend_docker_build_args = {
      "TRANSIFEX_TOKEN" = var.transifex_token
  }
}

module "frontend_build" {
  source = "./modules/cloudbuild"
  name = "frontend"
  region = var.gcp_region
  project_id = var.gcp_project_id
  github_branch = "infrastructure-basics"
  github_org = var.github_org
  github_project = var.github_project
  image_name = "frontend"
  dockerfile_path = "./frontend/Dockerfile"
  docker_context_path = "./frontend"
  docker_build_args = local.frontend_docker_build_args
  cloud_run_service_name = "frontend"
}

module "frontend_cloudrun" {
  source = "./modules/cloudrun"
  name = "frontend"
  region = var.gcp_region
  project_id = var.gcp_project_id
  image_name = "frontend"
}
