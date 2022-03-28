output "subscription_name" {
  value = google_pubsub_lite_subscription.subscription.name
}

output "topic_name" {
  value = google_pubsub_lite_topic.pubsub_topic.name
}
