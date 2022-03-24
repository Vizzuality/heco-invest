require "swagger_helper"

RSpec.describe "API V1 Project Developers", type: :request do
  before_all do
    @project_developer = create(:project_developer, :with_locations)
    create_list(:project_developer, 6)
  end

  include_examples :api_pagination, model: ProjectDeveloper, expected_total: 7

  path "/api/v1/project_developers" do
    get "Returns list of the project developers" do
      tags "Project Developers"
      produces "application/json"
      parameter name: "page[number]", in: :query, type: :integer, description: "Page number. Default: 1", required: false
      parameter name: "page[size]", in: :query, type: :integer, description: "Per page items. Default: 10", required: false
      parameter name: "fields[project_developer]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/project_developer"}},
          meta: {"$ref" => "#/components/schemas/pagination_meta"},
          links: {"$ref" => "#/components/schemas/pagination_links"}
        }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/project_developers", dynamic_attributes: %w[picture_url])
        end

        context "with sparse fieldset" do
          let("fields[project_developer]") { "instagram,facebook,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/project-developers-sparse-fieldset")
          end
        end
      end
    end
  end

  path "/api/v1/project_developers/{id}" do
    get "Find project developer by id or slug" do
      tags "Project Developers"
      produces "application/json"
      parameter name: :id, in: :path, type: :string, description: "Use project developer ID or account slug"
      parameter name: "fields[project_developer]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false

      let(:id) { @project_developer.id }

      it_behaves_like "with not found error"

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/project_developer"}
        }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/get-project-developer", dynamic_attributes: %w[picture_url])
        end

        context "when slug is used" do
          let(:id) { @project_developer.account.slug }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/get-project-developer", dynamic_attributes: %w[picture_url])
          end
        end

        context "with sparse fieldset" do
          let("fields[project_developer]") { "instagram,facebook,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/get-project-developer-sparse-fieldset")
          end
        end
      end
    end
  end
end
