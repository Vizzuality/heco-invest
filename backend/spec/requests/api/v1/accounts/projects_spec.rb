require "swagger_helper"

RSpec.describe "API V1 Account Projects", type: :request do
  let(:country) { create(:country) }
  let(:municipality) { create(:municipality) }
  let(:department) { create(:department) }
  let(:user) { create(:user_project_developer, first_name: "User", last_name: "Example") }
  let(:project_developers) { create_list(:project_developer, 2) }

  project_params_schema = {
    type: :object,
    properties: {
      name: {type: :string},
      country_id: {type: :string},
      municipality_id: {type: :string},
      department_id: {type: :string},
      development_stage: {type: :string, enum: ProjectDevelopmentStage::TYPES},
      estimated_duration_in_months: {type: :integer},
      involved_project_developer_not_listed: {type: :boolean},
      "involved_project_developer_ids[]": {type: :array, items: {type: :string}, collectionFormat: :multi},
      problem: {type: :string},
      solution: {type: :string},
      expected_impact: {type: :string},
      looking_for_funding: {type: :boolean},
      funding_plan: {type: :string},
      ticket_size: {type: :string, enum: TicketSize::TYPES},
      received_funding: {type: :boolean},
      received_funding_amount_usd: {type: :number},
      received_funding_investor: {type: :string},
      replicability: {type: :string},
      sustainability: {type: :string},
      progress_impact_tracking: {type: :string},
      description: {type: :string},
      relevant_links: {type: :string},
      geometry: {type: :object},
      category: {type: :string, enum: Category::TYPES},
      "target_groups[]": {type: :array, items: {type: :string, enum: ProjectTargetGroup::TYPES}, collectionFormat: :multi},
      "impact_areas[]": {type: :array, items: {type: :string, enum: ImpactArea::TYPES}, collectionFormat: :multi},
      "sdgs[]": {type: :array, items: {type: :integer, enum: Sdg::TYPES}, collectionFormat: :multi},
      "instrument_types[]": {type: :array, items: {type: :string, enum: InstrumentType::TYPES}, collectionFormat: :multi},
      "project_images_attributes[]": {
        type: :array,
        items: {
          type: :object,
          properties: {
            file: {type: :file},
            cover: {type: :boolean},
            _destroy: {type: :string}
          },
          required: %w[file cover]
        },
        collectionFormat: :multi
      },
      includes: {type: :string}
    },
    required: %w[
      name country_id municipality_id department_id
      development_stage estimated_duration_in_months problem solution expected_impact
      looking_for_funding received_funding replicability sustainability progress_impact_tracking description
      category target_groups[] impact_areas[] sdgs[]
    ]
  }

  path "/api/v1/account/projects" do
    post "Create new Projects for User" do
      tags "Projects"
      consumes "multipart/form-data"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: :project_params, in: :formData, schema: project_params_schema

      let(:project_params) do
        {
          name: "Project Name",
          country_id: country.id,
          municipality_id: municipality.id,
          department_id: department.id,
          development_stage: "consolidaton",
          estimated_duration_in_months: 12,
          problem: "Problem description",
          solution: "Solution description",
          expected_impact: "Expected impact description",
          looking_for_funding: true,
          funding_plan: "Funding plan description",
          ticket_size: "prototyping",
          received_funding: true,
          received_funding_amount_usd: 1_000_000,
          received_funding_investor: "Some Investor name",
          replicability: "Replicability desc",
          sustainability: "Sustainability desc",
          progress_impact_tracking: "Progress impact tracking desc",
          description: "Short project description",
          relevant_links: "Here relevant links",
          involved_project_developer_ids: project_developers.map(&:id),
          involved_project_developer_not_listed: true,
          geometry: {type: "Point", coordinates: [1, 2]},
          category: "sustainable-agrosystems",
          target_groups: %w[urban-populations indigenous-peoples],
          impact_areas: %w[restoration pollutants-reduction],
          sdgs: [2, 4, 5],
          instrument_types: %w[grant],
          project_images_attributes: [
            {file: fixture_file_upload("picture.jpg"), cover: true},
            {file: fixture_file_upload("picture.jpg"), cover: false}
          ],
          includes: "project_images"
        }
      end

      it_behaves_like "with not authorized error", csrf: true, require_project_developer: true

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/project"}
        }
        let("X-CSRF-TOKEN") { get_csrf_token }

        before(:each) { sign_in user }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/accounts-project-create")
        end

        it "queues translation job" do
          job = ActiveJob::Base.queue_adapter.enqueued_jobs.find do |j|
            j[:job] == Translations::TranslateProjectJob
          end
          expect(job).not_to be_nil
        end
      end

      response "422", "Validation errors" do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/errors"}
        }
        let("X-CSRF-TOKEN") { get_csrf_token }

        before(:each) do
          create(:project, name: "Project name", project_developer: user.account.project_developer)
          sign_in user
        end

        run_test!

        it "returns correct error", generate_swagger_example: true do
          expect(response_json["errors"][0]["title"]).to eq("Name en (EN) has already been taken")
        end
      end
    end
  end
end
