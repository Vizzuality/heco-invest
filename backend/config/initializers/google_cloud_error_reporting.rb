require "google/cloud/error_reporting"

Google::Cloud.configure do |config|
  config.project_id = ENV["GCP_PROJECT_ID"]
  config.service_name = [ENV["INSTANCE_ROLE"], ENV["IS_JOBS_INSTANCE"].to_s == "true" ? "JOBS" : ""].join("-")
end
