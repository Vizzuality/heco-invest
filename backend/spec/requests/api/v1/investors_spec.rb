require "swagger_helper"

RSpec.describe "API V1 Investors", type: :request do
  before_all do
    @investor = create(:investor)
    create_list(:investor, 6)
  end

  include_examples :api_pagination, model: Investor, expected_total: 7

  path "/api/v1/investors" do
    get "Returns list of the investors" do
      tags "Investors"
      produces "application/json"
      parameter name: "page[number]", in: :query, type: :integer, description: "Page number. Default: 1", required: false
      parameter name: "page[size]", in: :query, type: :integer, description: "Per page items. Default: 10", required: false
      parameter name: "fields[investor]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/investor"}},
          meta: {"$ref" => "#/components/schemas/pagination_meta"},
          links: {"$ref" => "#/components/schemas/pagination_links"}
        }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/investors", dynamic_attributes: %w[picture_url])
        end

        context "with sparse fieldset" do
          let("fields[investor]") { "instagram,facebook,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/investors-sparse-fieldset")
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
          expect(response.body).to match_snapshot("api/v1/get-investor", dynamic_attributes: %w[picture_url])
        end

        context "when slug is used" do
          let(:id) { @investor.account.slug }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/get-investor", dynamic_attributes: %w[picture_url])
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
