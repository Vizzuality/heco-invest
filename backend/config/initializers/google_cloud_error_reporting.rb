require "google/cloud/error_reporting"

Google::Cloud.configure do |config|
  config.project_id = ENV["GCP_PROJECT_ID"]
end
