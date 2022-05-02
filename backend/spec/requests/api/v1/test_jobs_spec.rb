require "swagger_helper"

RSpec.describe "API V1 Test Jobs", type: :request do
  include ActiveJob::TestHelper

  path "/api/v1/test_jobs/test_sync" do
    post "Tests sync processing" do
      tags "Test Jobs"
      consumes "application/json"
      produces "application/json"
      security [csrf: []]
      parameter name: :test_job_params, in: :body, schema: {
        type: :object,
        properties: {email: {type: :string}},
        required: [:email]
      }

      response "200", :success do
        let(:test_job_params) { {email: "user@example.com"} }
        let("X-CSRF-TOKEN") { get_csrf_token }

        run_test!

        it "sends email" do
          mail = ActionMailer::Base.deliveries.last
          expect(mail.subject).to eq("Hello from test job")
          expect(mail.to.first).to eq("user@example.com")
        end
      end
    end
  end

  path "/api/v1/test_jobs/test_async" do
    post "Tests async processing" do
      tags "Test Jobs"
      consumes "application/json"
      produces "application/json"
      security [csrf: []]
      parameter name: :test_job_params, in: :body, schema: {
        type: :object,
        properties: {email: {type: :string}},
        required: [:email]
      }

      response "200", :success do
        let(:test_job_params) { {email: "user@example.com"} }
        let("X-CSRF-TOKEN") { get_csrf_token }

        run_test!

        it "queues email" do
          job = ActiveJob::Base.queue_adapter.enqueued_jobs.last
          expect(job[:job]).to eq(TestJob)
          expect(job[:args]).to eq(["user@example.com"])
        end
      end
    end
  end
end
