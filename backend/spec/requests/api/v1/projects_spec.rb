require "swagger_helper"

RSpec.describe "API V1 Projects", type: :request do
  before_all do
    @project = create(:project, :with_involved_project_developers, :with_project_images, category: "non-timber-forest-production")
    create_list(:project, 6, category: "forestry-and-agroforestry")
  end

  include_examples :api_pagination, model: Project, expected_total: 7

  path "/api/v1/projects" do
    get "Returns list of the projects" do
      tags "Projects"
      produces "application/json"
      parameter name: "page[number]", in: :query, type: :integer, description: "Page number. Default: 1", required: false
      parameter name: "page[size]", in: :query, type: :integer, description: "Per page items. Default: 10", required: false
      parameter name: "fields[project]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :includes, in: :query, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false
      parameter name: "search[category]", in: :query, type: :string, required: false
      parameter name: "search[sdg]", in: :query, type: :integer, required: false
      parameter name: "search[instrument_type]", in: :query, type: :string, required: false
      parameter name: "search[ticket_size]", in: :query, type: :string, required: false

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/project"}},
          meta: {"$ref" => "#/components/schemas/pagination_meta"},
          links: {"$ref" => "#/components/schemas/pagination_links"}
        }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/projects")
        end

        context "with sparse fieldset" do
          let("fields[project]") { "name,description,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/projects-sparse-fieldset")
          end
        end

        context "with relationships" do
          let("fields[project]") { "name,project_developer" }
          let(:includes) { "project_developer" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/projects-include-relationships")
          end
        end

        context "when searching is used" do
          let("search[category]") { @project.category }

          it "includes searched project" do
            expect(response_json["data"].pluck("id")).to eq([@project.id])
          end
        end
      end
    end
  end

  path "/api/v1/projects/{id}" do
    get "Find project by id or slug" do
      tags "Projects"
      produces "application/json"
      parameter name: :id, in: :path, type: :string, description: "Use project ID or slug"
      parameter name: "fields[project]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :includes, in: :query, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false

      let(:id) { @project.id }

      it_behaves_like "with not found error"

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/project"}
        }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/get-project")
        end

        context "when slug is used" do
          let(:id) { @project.slug }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/get-project")
          end
        end

        context "with sparse fieldset" do
          let("fields[project]") { "name,description,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/get-project-sparse-fieldset")
          end
        end

        context "with relationships" do
          let("fields[project]") { "name,project_developer" }
          let(:includes) { "project_developer" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/get-project-include-relationships")
          end
        end
      end
    end
  end
end
