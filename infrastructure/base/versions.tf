terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.20"
    }

    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 4.20"
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
  zone    = var.gcp_zone
}

provider "google-beta" {
  project = var.gcp_project_id
  region  = var.gcp_region
}
