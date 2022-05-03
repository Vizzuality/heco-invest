require "swagger_helper"

RSpec.describe "API V1 Open Calls", type: :request do
  before_all do
    @open_call = create(:open_call, instrument_type: "grant")
    create_list(:open_call, 6, instrument_type: "loan")
  end

  include_examples :api_pagination, model: OpenCall, expected_total: 7

  path "/api/v1/open_calls" do
    get "Returns list of the open calls" do
      tags "Open Calls"
      produces "application/json"
      parameter name: "page[number]", in: :query, type: :integer, description: "Page number. Default: 1", required: false
      parameter name: "page[size]", in: :query, type: :integer, description: "Per page items. Default: 10", required: false
      parameter name: "fields[open_call]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: "filter[sdg]", in: :query, type: :integer, required: false, description: "Filter records. Use comma to separate multiple filter options."
      parameter name: "filter[instrument_type]", in: :query, type: :string, required: false, description: "Filter records. Use comma to separate multiple filter options."
      parameter name: "filter[ticket_size]", in: :query, type: :string, required: false, description: "Filter records. Use comma to separate multiple filter options."
      parameter name: "filter[only_verified]", in: :query, type: :boolean, required: false, description: "Filter records."
      parameter name: "filter[full_text]", in: :query, type: :string, required: false, description: "Filter records by provided text."

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

        context "when filtering is used" do
          let("filter[instrument_type]") { @open_call.instrument_type }

          it "includes filtered open call" do
            expect(response_json["data"].pluck("id")).to eq([@open_call.id])
          end
        end

        context "when filtered by searched text" do
          let("filter[full_text]") { @open_call.name }

          it "contains only correct records" do
            expect(response_json["data"].pluck("id")).to eq([@open_call.id])
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
