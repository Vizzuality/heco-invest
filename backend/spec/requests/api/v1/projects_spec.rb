require "swagger_helper"

RSpec.describe "API V1 Projects", type: :request do
  before_all do
    @project = create(:project, :with_involved_project_developers, :with_project_images, category: "non-timber-forest-production")
    create_list(:project, 6, category: "forestry-and-agroforestry")

    unapproved_pd = create(:project_developer, account: create(:account, :unapproved, users: [create(:user)]))
    @approved_pd = create(:project_developer, account: create(:account, :approved, users: [create(:user)]))
    @unapproved_project = create(:project, project_developer: unapproved_pd)
    @draft_project = create(:project, :draft, category: "non-timber-forest-production")
    @project_in_pt = create(
      :project,
      project_developer: create(:project_developer, account: create(:account, language: "pt")),
      description_en: "Description EN", description_es: "Description ES", description_pt: "Description PT"
    )
  end

  include_examples :api_pagination, model: Project, expected_total: 8

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
      parameter name: :locale, in: :query, type: :string, required: false, description: "Retrieve content in required language, skip for account language."

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

        it "ignores draft record" do
          expect(response_json["data"].pluck("id")).not_to include(@draft_project.id)
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

        context "when listing own projects" do
          before { sign_in @draft_project.project_developer.account.users.first }

          it "still ignores draft record" do
            expect(response_json["data"].pluck("id")).not_to include(@draft_project.id)
          end

          run_test!
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
      parameter name: :locale, in: :query, type: :string, required: false, description: "Retrieve content in required language, skip for account language."

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

        context "when project developer shows its own draft project" do
          let(:id) { @draft_project.id }

          before { sign_in @draft_project.project_developer.account.users.first }

          run_test!
        end

        context "account language" do
          context "when locale set" do
            let(:id) { @project_in_pt.id }
            let(:locale) { "es" }

            it "returns content in requested language" do
              expect(response_json["data"]["attributes"]["description"]).to eq("Description ES")
            end
          end

          context "when locale not set" do
            let(:id) { @project_in_pt.id }

            it "returns content in account language" do
              expect(response_json["data"]["attributes"]["description"]).to eq("Description PT")
            end
          end
        end
      end

      response "403", :forbidden do
        schema "$ref" => "#/components/schemas/errors"

        let(:id) { @unapproved_project.id }

        run_test!

        context "when logged in user tries to see project of unapproved project developer" do
          before { sign_in @approved_pd.account.users.first }

          run_test!
        end

        context "when logged in user tries to see draft project of different project developer" do
          let(:id) { @draft_project.id }

          before { sign_in @approved_pd.account.users.first }

          run_test!
        end
      end
    end
  end
end
