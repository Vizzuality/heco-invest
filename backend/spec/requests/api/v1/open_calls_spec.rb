require "swagger_helper"

RSpec.describe "API V1 Open Calls", type: :request do
  before_all do
    @open_call = create(:open_call)
    create_list(:open_call, 6)
  end

  include_examples :api_pagination, model: OpenCall, expected_total: 7

  path "/api/v1/open_calls" do
    get "Returns list of the open calls" do
      tags "Open Calls"
      produces "application/json"
      parameter name: "page[number]", in: :query, type: :integer, description: "Page number. Default: 1", required: false
      parameter name: "page[size]", in: :query, type: :integer, description: "Per page items. Default: 10", required: false
      parameter name: "fields[open_call]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/open_call"}},
          meta: {"$ref" => "#/components/schemas/pagination_meta"},
          links: {"$ref" => "#/components/schemas/pagination_links"}
        }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/open_calls", dynamic_attributes: %w[closing_at])
        end

        context "with sparse fieldset" do
          let("fields[open_call]") { "name,description,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/open-calls-sparse-fieldset")
          end
        end
      end
    end
  end

  path "/api/v1/open_calls/{id}" do
    get "Find open call by id or slug" do
      tags "Open Calls"
      produces "application/json"
      parameter name: :id, in: :path, type: :string, description: "Use open call ID or slug"
      parameter name: "fields[open_call]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false

      let(:id) { @open_call.id }

      it_behaves_like "with not found error"

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/open_call"}
        }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/get-open_call", dynamic_attributes: %w[closing_at])
        end

        context "when slug is used" do
          let(:id) { @open_call.slug }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/get-open_call", dynamic_attributes: %w[closing_at])
          end
        end

        context "with sparse fieldset" do
          let("fields[open_call]") { "name,description,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/get-open-call-sparse-fieldset")
          end
        end
      end
    end
  end
end
