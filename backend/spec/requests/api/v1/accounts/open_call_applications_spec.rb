require "swagger_helper"

RSpec.describe "API V1 Account Open Call Applications", type: :request do
  let(:user) { create :user, :project_developer, account: create(:account_project_developer, language: :es) }

  path "/api/v1/account/open_call_applications" do
    post "Create new Open Call Application for Project Developer" do
      tags "Open Call Applications"
      consumes "application/json"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: :open_call_application_params, in: :body, schema: {
        type: :object,
        properties: {
          project_id: {type: :string},
          open_call_id: {type: :string},
          message: {type: :string}
        },
        required: %w[project_id open_call_id message]
      }

      let(:project) { create :project, project_developer: user.account.project_developer }
      let(:open_call) { create :open_call }
      let(:open_call_application_params) do
        {
          project_id: project.id,
          open_call_id: open_call.id,
          message: "This is message",
          locale: :en,
          includes: "project,project_developer"
        }
      end

      it_behaves_like "with not authorized error", csrf: true
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user) }
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user_investor) }

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/open_call_application"}
        }
        let("X-CSRF-TOKEN") { get_csrf_token }

        before(:each) { sign_in user }

        it "matches snapshot", generate_swagger_example: true do |example|
          expect {
            submit_request example.metadata
            assert_response_matches_metadata example.metadata
          }.to change(OpenCallApplication, :count).by(1)
          expect(response.body).to match_snapshot("api/v1/account/open-call-applications-create")
        end

        it "saves data to account language attributes" do |example|
          submit_request example.metadata
          open_call = OpenCallApplication.find response_json["data"]["id"]
          OpenCallApplication.translatable_attributes.each do |attr|
            expect(open_call.public_send("#{attr}_#{user.account.language}")).to eq(open_call_application_params[attr])
          end
        end
      end

      response "403", :forbidden do
        schema "$ref" => "#/components/schemas/errors"

        let("X-CSRF-TOKEN") { get_csrf_token }

        before(:each) { sign_in user }

        context "when project developer is not owner of project" do
          let(:project) { create :project }

          run_test!
        end

        context "when project is draft" do
          let(:project) { create :project, project_developer: user.account.project_developer, status: :draft }

          run_test!
        end

        context "when open call is already closed" do
          let(:open_call) { create :open_call, status: :closed }

          run_test!
        end

        context "when open call is draft" do
          let(:open_call) { create :open_call, status: :draft }

          run_test!
        end

        context "when open call closing_at is before current time" do
          before { open_call.update_column :closing_at, 1.day.ago }

          run_test!
        end
      end

      response "422", "Project already applied to open call" do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/errors"}
        }
        let("X-CSRF-TOKEN") { get_csrf_token }

        before(:each) do
          create(:open_call_application, project: project, open_call: open_call)
          sign_in user
        end

        run_test!

        it "returns correct error", generate_swagger_example: true do
          expect(response_json["errors"][0]["title"]).to eq("Open call has already been taken")
        end
      end
    end
  end
end
