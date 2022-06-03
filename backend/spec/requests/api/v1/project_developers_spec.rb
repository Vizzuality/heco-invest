require "swagger_helper"

RSpec.describe "API V1 Project Developers", type: :request do
  before_all do
    @project_developer = create(:project_developer, :with_involved_projects, number_of_projects: 2, categories: ["tourism-and-recreation"])
    create_list(:project_developer, 6, categories: %w[forestry-and-agroforestry non-timber-forest-production])
    @unapproved_project_developer = create(:project_developer, account: create(:account, review_status: :unapproved))
    @approved_account = create(:account, review_status: :approved, users: [create(:user)])
  end

  include_examples :api_pagination, model: ProjectDeveloper, expected_total: 10 # TODO: back to 9 when approved filter restored

  path "/api/v1/project_developers" do
    get "Returns list of the project developers" do
      tags "Project Developers"
      produces "application/json"
      parameter name: "page[number]", in: :query, type: :integer, description: "Page number. Default: 1", required: false
      parameter name: "page[size]", in: :query, type: :integer, description: "Per page items. Default: 10", required: false
      parameter name: "fields[project_developer]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :includes, in: :query, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false
      parameter name: "filter[category]", in: :query, type: :string, required: false, description: "Filter records. Use comma to separate multiple filter options."
      parameter name: "filter[impact]", in: :query, type: :string, required: false, description: "Filter records. Use comma to separate multiple filter options."
      parameter name: "filter[full_text]", in: :query, type: :string, required: false, description: "Filter records by provided text."
      parameter name: :sorting, in: :query, type: :string, enum: ["name asc", "name desc", "created_at asc", "created_at desc"], required: false, description: "Sort records."

      let(:sorting) { "name asc" }

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/project_developer"}},
          meta: {"$ref" => "#/components/schemas/pagination_meta"},
          links: {"$ref" => "#/components/schemas/pagination_links"}
        }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/project_developers")
        end

        pending("fix when approved filter restored") do
          it "ignores unapproved record" do
            expect(response_json["data"].pluck("id")).not_to include(@unapproved_project_developer.id)
          end
        end

        context "with sparse fieldset" do
          let("fields[project_developer]") { "instagram,facebook,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/project-developers-sparse-fieldset")
          end
        end

        context "with relationships" do
          let("fields[project_developer]") { "name,involved_projects" }
          let(:includes) { "involved_projects" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/project-developers-include-relationships")
          end
        end

        context "when filtering is used" do
          let("filter[category]") { @project_developer.categories.join(",") }

          it "includes filtered project developer" do
            expect(response_json["data"].pluck("id")).to eq([@project_developer.id])
          end
        end

        context "when filtered by searched text" do
          let("filter[full_text]") { @project_developer.mission }

          it "contains only correct records" do
            expect(response_json["data"].pluck("id")).to eq([@project_developer.id])
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
      parameter name: :includes, in: :query, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false

      let(:id) { @project_developer.id }

      it_behaves_like "with not found error"

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/project_developer"}
        }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/get-project-developer")
        end

        context "when slug is used" do
          let(:id) { @project_developer.account.slug }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/get-project-developer")
          end
        end

        context "with sparse fieldset" do
          let("fields[project_developer]") { "instagram,facebook,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/get-project-developer-sparse-fieldset")
          end
        end

        context "with relationships" do
          let("fields[project_developer]") { "name,involved_projects" }
          let(:includes) { "involved_projects" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/get-project-developer-include-relationships")
          end
        end

        context "with analyzed picture" do
          before do |example|
            ActiveStorage::AnalyzeJob.perform_now @project_developer.account.picture
            submit_request example.metadata
          end

          it "contains picture" do
            expect(response_json["data"]["attributes"]["picture"]["original"]).not_to be_nil
          end
        end

        context "when approved account checks project developer" do
          before { sign_in @approved_account.users.first }

          run_test!

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/get-project-developer-approved-account")
          end
        end
      end
    end
  end
end
