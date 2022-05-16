require "swagger_helper"

RSpec.describe "API V1 Background Job Events", type: :request do
  before_all do
    @crashed_event = create :background_job_event, status: :crashed
    @late_event = create :background_job_event, created_at: 10.days.ago
  end

  path "/api/v1/background_job_events" do
    get "Returns list of the background job events" do
      tags "Background Job Events"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: "page[number]", in: :query, type: :integer, description: "Page number. Default: 1", required: false
      parameter name: "page[size]", in: :query, type: :integer, description: "Per page items. Default: 10", required: false
      parameter name: "filter[status]", in: :query, type: :string, description: "Filter records", required: false
      parameter name: "filter[created_at_min]", in: :query, type: :string, description: "Filter records", required: false
      parameter name: "filter[created_at_max]", in: :query, type: :string, description: "Filter records", required: false

      let(:user) { create :user }

      it_behaves_like "with not authorized error", csrf: true

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/background_job_event"}},
          meta: {"$ref" => "#/components/schemas/pagination_meta"},
          links: {"$ref" => "#/components/schemas/pagination_links"}
        }
        let("X-CSRF-TOKEN") { get_csrf_token }

        before { sign_in user }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/background-job-events")
        end

        context "when filtered by status" do
          let("filter[status]") { :crashed }

          it "returns only correct records" do
            expect(response_json["data"].pluck("id")).to eq([@crashed_event.id])
          end
        end

        context "when filtered by created at" do
          let("filter[created_at_max]") { 2.days.ago }

          it "returns only correct records" do
            expect(response_json["data"].pluck("id")).to eq([@late_event.id])
          end
        end
      end
    end
  end
end
