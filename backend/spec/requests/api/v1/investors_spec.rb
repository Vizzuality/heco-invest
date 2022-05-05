require "swagger_helper"

RSpec.describe "API V1 Investors", type: :request do
  before_all do
    @investor = create(:investor, sdgs: [3, 4])
    create_list(:investor, 6, sdgs: [1, 5])
    @unapproved_investor = create(:investor, account: create(:account, review_status: :unapproved))
  end

  include_examples :api_pagination, model: Investor, expected_total: 7

  path "/api/v1/investors" do
    get "Returns list of the investors" do
      tags "Investors"
      produces "application/json"
      parameter name: "page[number]", in: :query, type: :integer, description: "Page number. Default: 1", required: false
      parameter name: "page[size]", in: :query, type: :integer, description: "Per page items. Default: 10", required: false
      parameter name: "fields[investor]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: "filter[category]", in: :query, type: :string, required: false, description: "Filter records. Use comma to separate multiple filter options."
      parameter name: "filter[impact]", in: :query, type: :string, required: false, description: "Filter records. Use comma to separate multiple filter options."
      parameter name: "filter[sdg]", in: :query, type: :integer, required: false, description: "Filter records. Use comma to separate multiple filter options."
      parameter name: "filter[instrument_type]", in: :query, type: :string, required: false, description: "Filter records. Use comma to separate multiple filter options."
      parameter name: "filter[ticket_size]", in: :query, type: :string, required: false, description: "Filter records. Use comma to separate multiple filter options."

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/investor"}},
          meta: {"$ref" => "#/components/schemas/pagination_meta"},
          links: {"$ref" => "#/components/schemas/pagination_links"}
        }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/investors")
        end

        it "ignores unapproved record" do
          expect(response_json["data"].pluck("id")).not_to include(@unapproved_investor.id)
        end

        context "with sparse fieldset" do
          let("fields[investor]") { "instagram,facebook,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/investors-sparse-fieldset")
          end
        end

        context "when filtering is used" do
          let("filter[sdg]") { @investor.sdgs.join(",") }

          it "includes filtered investor" do
            expect(response_json["data"].pluck("id")).to eq([@investor.id])
          end
        end
      end
    end
  end

  path "/api/v1/investors/{id}" do
    get "Find investor by id or slug" do
      tags "Investors"
      produces "application/json"
      parameter name: :id, in: :path, type: :string, description: "Use investor ID or account slug"
      parameter name: "fields[investor]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false

      let(:id) { @investor.id }

      it_behaves_like "with not found error"

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/investor"}
        }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/get-investor")
        end

        context "when slug is used" do
          let(:id) { @investor.account.slug }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/get-investor")
          end
        end

        context "with sparse fieldset" do
          let("fields[investor]") { "instagram,facebook,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/get-investor-sparse-fieldset")
          end
        end
      end
    end
  end
end
