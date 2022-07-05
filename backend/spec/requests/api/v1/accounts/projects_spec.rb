require "swagger_helper"

RSpec.describe "API V1 Account Projects", type: :request do
  let(:country) { create(:country) }
  let(:municipality) { create(:municipality) }
  let(:department) { create(:department) }
  let(:user) { create(:user_project_developer, first_name: "User", last_name: "Example") }
  let(:project_developers) { create_list(:project_developer, 2) }
  let(:blob) { ActiveStorage::Blob.create_and_upload! io: fixture_file_upload("picture.jpg"), filename: "test" }

  project_params_schema = {
    type: :object,
    properties: {
      name: {type: :string},
      status: {type: :string, enum: ProjectStatus::TYPES, default: "published"},
      country_id: {type: :string},
      municipality_id: {type: :string},
      department_id: {type: :string},
      development_stage: {type: :string, enum: ProjectDevelopmentStage::TYPES},
      estimated_duration_in_months: {type: :integer},
      involved_project_developer_not_listed: {type: :boolean},
      involved_project_developer_ids: {type: :array, items: {type: :string}},
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
      target_groups: {type: :array, items: {type: :string, enum: ProjectTargetGroup::TYPES}},
      impact_areas: {type: :array, items: {type: :string, enum: ImpactArea::TYPES}},
      sdgs: {type: :array, items: {type: :integer, enum: Sdg::TYPES}},
      instrument_types: {type: :array, items: {type: :string, enum: InstrumentType::TYPES}},
      project_images_attributes: {
        type: :array,
        items: {
          type: :object,
          properties: {
            file: {type: :string},
            cover: {type: :boolean},
            _destroy: {type: :string}
          },
          required: %w[file cover]
        }
      },
      includes: {type: :string}
    },
    required: %w[
      name country_id municipality_id department_id
      development_stage estimated_duration_in_months problem solution expected_impact
      looking_for_funding received_funding replicability sustainability progress_impact_tracking description
      category target_groups impact_areas sdgs
    ]
  }

  path "/api/v1/account/projects" do
    get "Returns list of projects of User" do
      tags "Projects"
      produces "application/json"
      security [csrf: [], cookie_auth: []]

      parameter name: "fields[project]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :includes, in: :query, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false
      parameter name: "filter[full_text]", in: :query, type: :string, required: false, description: "Filter records by provided text."

      it_behaves_like "with not authorized error", csrf: true, require_project_developer: true

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/project"}}
        }

        let("X-CSRF-TOKEN") { get_csrf_token }

        before(:each) do
          @project = create(:project, name: "This PDs Project Awesome", project_developer: user.account.project_developer)
          create(:project, name: "This PDs Project Amazing", project_developer: user.account.project_developer)
          create(:project, name: "Other PD's project", project_developer: create(:project_developer))
          create(:project, :draft, name: "Draft project", project_developer: user.account.project_developer)
          sign_in user
        end

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/account/projects")
        end

        context "with sparse fieldset" do
          let("fields[project]") { "name,description,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/account/projects-sparse-fieldset")
          end
        end

        context "with relationships" do
          let("fields[project]") { "name,project_developer" }
          let(:includes) { "project_developer" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/account/projects-include-relationships")
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

    post "Create new Projects for User" do
      tags "Projects"
      consumes "application/json"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: :project_params, in: :body, schema: project_params_schema

      let(:project_params) do
        {
          name: "Project Name",
          status: "draft",
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
          geometry: {type: "FeatureCollection", features: [{type: "Feature", properties: {}, geometry: {type: "Polygon", coordinates: [[[-77.84036872266269, 1.5274297752414188], [-77.1591467371437, 0.4940264211830182], [-76.4661795449776, 0.8933333719051408], [-77.2531083903186, 1.7974555737018534], [-77.84036872266269, 1.5274297752414188]]]}}]},
          category: "sustainable-agrosystems",
          target_groups: %w[urban-populations indigenous-peoples],
          impact_areas: %w[restoration pollutants-reduction],
          sdgs: [2, 4, 5],
          instrument_types: %w[grant],
          project_images_attributes: [
            {file: blob.signed_id, cover: true},
            {file: blob.signed_id, cover: false}
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
          job = ActiveJob::Base.queue_adapter.enqueued_jobs.find { |j| j[:job] == TranslateJob }
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

  path "/api/v1/account/projects/{id}" do
    put "Update existing Project of User" do
      tags "Projects"
      consumes "application/json"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: :id, in: :path, type: :string, description: "Use project ID or slug"
      parameter name: :project_params, in: :body, schema: project_params_schema

      let(:project_image) { create :project_image }
      let(:project) { create :project, :draft, project_images: [project_image] }
      let(:id) { project.id }
      let(:project_params) do
        {
          name: "Updated Project Name",
          status: "published",
          country_id: country.id,
          municipality_id: municipality.id,
          department_id: department.id,
          development_stage: "consolidaton",
          estimated_duration_in_months: 12,
          problem: "Updated Problem description",
          solution: "Updated Solution description",
          expected_impact: "Updated Expected impact description",
          looking_for_funding: true,
          funding_plan: "Updated Funding plan description",
          ticket_size: "prototyping",
          received_funding: true,
          received_funding_amount_usd: 1_000_000,
          received_funding_investor: "Updated Some Investor name",
          replicability: "Updated Replicability desc",
          sustainability: "Updated Sustainability desc",
          progress_impact_tracking: "Updated Progress impact tracking desc",
          description: "Updated Short project description",
          relevant_links: "Updated Here relevant links",
          involved_project_developer_ids: project_developers.map(&:id),
          involved_project_developer_not_listed: true,
          geometry: {type: "Point", coordinates: [1, 2]},
          category: "sustainable-agrosystems",
          target_groups: %w[urban-populations indigenous-peoples],
          impact_areas: %w[restoration pollutants-reduction],
          sdgs: [2, 4, 5],
          instrument_types: %w[grant]
        }
      end

      it_behaves_like "with not authorized error", csrf: true, require_project_developer: true
      it_behaves_like "with not found error", csrf: true, user: -> { create(:user_project_developer) }
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user_project_developer) }

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/project"}
        }
        let("X-CSRF-TOKEN") { get_csrf_token }

        before do
          project.project_developer.account.users << user
          sign_in user
        end

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/accounts-project-update")
        end

        context "when slug is used" do
          let(:id) { project.slug }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/accounts-project-update")
          end
        end

        context "when adding new project image" do
          let(:project_params) do
            {project_images_attributes: [{file: blob.signed_id, cover: true}]}
          end

          it "adds new image" do
            expect(response_json["data"]["relationships"]["project_images"]["data"].count).to eq(2)
          end
        end

        context "when removing existing project image" do
          let(:project_params) do
            {project_images_attributes: [{id: project_image.id, _destroy: "1"}]}
          end

          it "removes image" do
            expect(response_json["data"]["relationships"]["project_images"]["data"].count).to eq(0)
          end
        end
      end
    end
  end
end
