output "trigger_name" {
  value = google_cloudbuild_trigger.build_trigger.name
}

output "trigger_secret" {
  value = google_secret_manager_secret_version.webhook_trigger_secret_key_data.secret_data
}

output "trigger" {
  value = google_cloudbuild_trigger.build_trigger
}
