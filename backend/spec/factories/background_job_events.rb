FactoryBot.define do
  factory :background_job_event do
    status { :enqueued }
    arguments { ["test@test.test"] }
    queue_name { "default" }
    priority { nil }
    executions { 1 }
    message { nil }
  end
end
