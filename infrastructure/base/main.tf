terraform {
  backend "gcs" {
    bucket = "heco-tf-state" // TF does not allow vars here. Use the value from var.bucket_name
    prefix = "state" // TF does not allow vars here. Use the value from var.tf_state_prefix
  }
}
