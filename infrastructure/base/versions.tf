terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.15"
    }

    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 4.15"
    }

    random = {
      source  = "hashicorp/random"
      version = "~> 3.1.0"
    }
  }
  required_version = "1.1.7"
}

provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_region
}

provider "google-beta" {
  project = var.gcp_project_id
  region  = var.gcp_region
}
