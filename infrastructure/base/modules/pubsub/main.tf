resource "google_project_service" "pubsub_lite_api" {
  service    = "pubsublite.googleapis.com"
  disable_on_destroy = false
}

resource "google_pubsub_lite_topic" "pubsub_topic" {
  name = var.name
  project = var.project_id
  region = var.region

  partition_config {
    count = 1
    capacity {
      publish_mib_per_sec = 4
      subscribe_mib_per_sec = 8
    }
  }

  retention_config {
    per_partition_bytes = 32212254720
  }

  depends_on = [google_project_service.pubsub_lite_api]
}

resource "google_pubsub_lite_subscription" "subscription" {
  name  = "${var.name}-subscription"
  topic = google_pubsub_lite_topic.pubsub_topic.name
  delivery_config {
    delivery_requirement = "DELIVER_AFTER_STORED"
  }
}
