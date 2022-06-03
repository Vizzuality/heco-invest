require "swagger_helper"

RSpec.describe "API V1 Projects", type: :request do
  before_all do
    @project = create(:project, :with_involved_project_developers, :with_project_images, category: "non-timber-forest-production")
    create_list(:project, 6, category: "forestry-and-agroforestry")
    @unapproved_project = create(:project, project_developer: create(:project_developer, account: create(:account, :unapproved, users: [create(:user)])))
    @approved_account = create(:account, review_status: :approved, users: [create(:user)])
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
      parameter name: "filter[category]", in: :query, type: :string, required: false, description: "Filter records. Use comma to separate multiple filter options."
      parameter name: "filter[sdg]", in: :query, type: :integer, required: false, description: "Filter records. Use comma to separate multiple filter options."
      parameter name: "filter[instrument_type]", in: :query, type: :string, required: false, description: "Filter records. Use comma to separate multiple filter options."
      parameter name: "filter[ticket_size]", in: :query, type: :string, required: false, description: "Filter records. Use comma to separate multiple filter options."
      parameter name: "filter[impact]", in: :query, type: :string, required: false, description: "Filter records. Use comma to separate multiple filter options."
      parameter name: "filter[only_verified]", in: :query, type: :boolean, required: false, description: "Filter records."
      parameter name: "filter[full_text]", in: :query, type: :string, required: false, description: "Filter records by provided text."
      parameter name: :sorting, in: :query, type: :string, required: false, description: "Sort records.",
        enum: ["name asc", "name desc", "created_at asc", "created_at desc",
          "municipality_biodiversity_impact asc", "municipality_climate_impact asc", "municipality_water_impact asc", "municipality_community_impact asc", "municipality_total_impact asc",
          "municipality_biodiversity_impact desc", "municipality_climate_impact desc", "municipality_water_impact desc", "municipality_community_impact desc", "municipality_total_impact desc"]

      let(:sorting) { "name asc" }

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

        it "ignores unapproved record" do
          expect(response_json["data"].pluck("id")).not_to include(@unapproved_project.id)
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

        context "when filtering is used" do
          let("filter[category]") { @project.category }

          it "includes filtered project" do
            expect(response_json["data"].pluck("id")).to eq([@project.id])
          end
        end

        context "when filtered by searched text" do
          let("filter[full_text]") { @project.name }

          it "contains only correct records" do
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

        context "when unapproved project developer shows its own project" do
          let(:id) { @unapproved_project.id }

          before { sign_in @unapproved_project.project_developer.account.users.first }

          run_test!
        end
      end

      response "403", :forbidden do
        schema "$ref" => "#/components/schemas/errors"

        let(:id) { @unapproved_project.id }

        run_test!

        context "when logged in user tries to see project of unapproved project developer" do
          before { sign_in @approved_account.users.first }

          run_test!
        end
      end
    end
  end
end
