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

module "frontend_build" {
  source = "./modules/cloudbuild"
  name = "frontend"
  region = var.gcp_region
  project_id = var.gcp_project_id
  github_branch = "frontend-dockerfile"
  github_org = var.github_org
  github_project = var.github_project
  image_name = "frontend"
  dockerfile_path = "./frontend/Dockerfile"
  docker_context_path = "./frontend"
}
