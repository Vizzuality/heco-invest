require "swagger_helper"

RSpec.describe "API V1 Account Open Call Applications", type: :request do
  let(:user) { create :user, :project_developer, account: create(:account_project_developer, language: :es) }

  path "/api/v1/account/open_call_applications" do
    get "Obtain list of Open Call Applications" do
      tags "Open Call Applications"
      consumes "application/json"
      produces "application/json"
      security [cookie_auth: []]
      parameter name: "fields[open_call_application]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :includes, in: :query, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false
      parameter name: "filter[project_id]", in: :query, type: :string, required: false, description: "Filter records by project."
      parameter name: "filter[open_call_id]", in: :query, type: :string, required: false, description: "Filter records by open call."
      parameter name: "filter[full_text]", in: :query, type: :string, required: false, description: "Filter records by provided text."

      let(:project_developer) { create :user_project_developer }
      let(:investor) { create :user_investor }
      let!(:project_developer_application) do
        create :open_call_application, project: create(:project, project_developer: project_developer.account.project_developer)
      end
      let!(:project_developer_searched_application) do
        create :open_call_application, project: create(:project, project_developer: project_developer.account.project_developer)
      end
      let!(:investor_application) do
        create :open_call_application, open_call: create(:open_call, investor: investor.account.investor)
      end
      let!(:investor_searched_application) do
        create :open_call_application, open_call: create(:open_call, investor: investor.account.investor)
      end
      let!(:ignored_application) { create :open_call_application }

      it_behaves_like "with not authorized error", csrf: true
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user) }

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/open_call_application"}}
        }

        context "when signed in as project developer" do
          before { sign_in project_developer }

          run_test!

          it "matches snapshot", generate_swagger_example: true do
            expect(response.body).to match_snapshot("api/v1/account/open-call-applications-project-developer")
          end

          it "does not contain application of different project developer" do
            expect(response_json["data"].pluck("id")).not_to include(ignored_application.id)
          end

          context "with sparse fieldset" do
            let("fields[open_call_application]") { "created_at,funded,nonexisting" }

            it "matches snapshot" do
              expect(response.body).to match_snapshot("api/v1/account/open-call-applications-sparse-fieldset")
            end
          end

          context "with relationships" do
            let("fields[open_call_application]") { "funded,project_developer" }
            let(:includes) { "project_developer" }

            it "matches snapshot" do
              expect(response.body).to match_snapshot("api/v1/account/open_call_applications-include-relationships")
            end
          end

          context "when filtered by project" do
            let("filter[project_id]") { project_developer_searched_application.project_id }

            it "contains only correct records" do
              expect(response_json["data"].pluck("id")).to eq([project_developer_searched_application.id])
            end
          end

          context "when filtered by open call" do
            let("filter[open_call_id]") { project_developer_searched_application.open_call_id }

            it "contains only correct records" do
              expect(response_json["data"].pluck("id")).to eq([project_developer_searched_application.id])
            end
          end

          context "when searched by project name" do
            let("filter[full_text]") { project_developer_searched_application.project.name }

            it "contains only correct records" do
              expect(response_json["data"].pluck("id")).to eq([project_developer_searched_application.id])
            end
          end

          context "when searched by investor name" do
            let("filter[full_text]") { project_developer_searched_application.investor.name }

            it "contains only correct records" do
              expect(response_json["data"].pluck("id")).to eq([project_developer_searched_application.id])
            end
          end

          context "when searched by open call name" do
            let("filter[full_text]") { project_developer_searched_application.open_call.name }

            it "contains only correct records" do
              expect(response_json["data"].pluck("id")).to eq([project_developer_searched_application.id])
            end
          end
        end

        context "when signed in as investor" do
          before { sign_in investor }

          run_test!

          it "matches snapshot", generate_swagger_example: true do
            expect(response.body).to match_snapshot("api/v1/account/open-call-applications-investor")
          end

          it "does not contain application of different investor" do
            expect(response_json["data"].pluck("id")).not_to include(ignored_application.id)
          end

          context "when searched by project name" do
            let("filter[full_text]") { investor_searched_application.project.name }

            it "contains only correct records" do
              expect(response_json["data"].pluck("id")).to eq([investor_searched_application.id])
            end
          end

          context "when searched by project developer name" do
            let("filter[full_text]") { investor_searched_application.project_developer.name }

            it "contains only correct records" do
              expect(response_json["data"].pluck("id")).to eq([investor_searched_application.id])
            end
          end
        end
      end
    end

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

  path "/api/v1/account/open_call_applications/{id}" do
    put "Update existing application of Project Developer" do
      tags "Open Call Applications"
      consumes "application/json"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: :id, in: :path, type: :string, description: "Use open call application ID"
      parameter name: :open_call_application_params, in: :body, schema: {
        type: :object,
        properties: {
          message: {type: :string}
        }
      }

      let(:open_call_application) { create :open_call_application }
      let(:id) { open_call_application.id }
      let(:user) { open_call_application.project_developer.owner }
      let(:open_call_application_params) { {message: "This is updated text"} }

      it_behaves_like "with not authorized error", csrf: true
      it_behaves_like "with not found error", csrf: true, user: -> { user }
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user) }
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user_project_developer) }
      it_behaves_like "with forbidden error", csrf: true, user: -> { open_call_application.investor.owner }

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/open_call_application"}
        }
        let("X-CSRF-TOKEN") { get_csrf_token }

        before { sign_in user }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/account/open-call-applications-update")
        end

        it "saves data to account language attributes" do
          open_call_application.reload
          OpenCallApplication.translatable_attributes.each do |attr|
            expect(open_call_application.public_send("#{attr}_#{user.account.language}")).to eq(open_call_application_params[attr])
          end
        end
      end

      response "422", "Validation errors" do
        schema "$ref" => "#/components/schemas/errors"

        let("X-CSRF-TOKEN") { get_csrf_token }
        let(:open_call_application_params) { {message: ""} }

        before { sign_in user }

        run_test!

        it "returns correct error", generate_swagger_example: true do
          expect(response_json["errors"][0]["title"]).to eq("Message can't be blank")
        end
      end
    end

    delete "Delete existing application of Project Developer" do
      tags "Open Call Applications"
      consumes "application/json"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: :id, in: :path, type: :string, description: "Use open call application ID"
      parameter name: :empty, in: :body, schema: {type: :object}, required: false

      let(:open_call_application) { create :open_call_application }
      let(:user) { open_call_application.project_developer.owner }
      let(:id) { open_call_application.id }

      it_behaves_like "with not authorized error", csrf: true
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user) }
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user_investor) }
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user_project_developer) }

      response "200", :success do
        let("X-CSRF-TOKEN") { get_csrf_token }

        before(:each) { sign_in user }

        it "removes open call application" do |example|
          expect {
            submit_request example.metadata
            assert_response_matches_metadata example.metadata
          }.to change(OpenCallApplication, :count).by(-1)
        end
      end
    end
  end

  path "/api/v1/account/open_call_applications/{id}/funding" do
    post "Mark Open Call Application as funded" do
      tags "Open Call Applications"
      consumes "application/json"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: :id, in: :path, type: :string, description: "Use open call application ID"
      parameter name: :empty, in: :body, schema: {type: :object}, required: false

      let(:open_call_application) { create :open_call_application, funded: false }
      let(:id) { open_call_application.id }
      let(:user) { open_call_application.investor.owner }

      it_behaves_like "with not authorized error", csrf: true
      it_behaves_like "with not found error", csrf: true, user: -> { user }
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user) }
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user_investor) }
      it_behaves_like "with forbidden error", csrf: true, user: -> { open_call_application.project_developer.owner }

      response "200", :success do
        let("X-CSRF-TOKEN") { get_csrf_token }

        before { sign_in user }

        run_test!

        it "is marked as funded" do
          expect(open_call_application.reload).to be_funded
        end
      end
    end
  end

  path "/api/v1/account/open_call_applications/{id}/not_funding" do
    post "Mark Open Call Application as not funded" do
      tags "Open Call Applications"
      consumes "application/json"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: :id, in: :path, type: :string, description: "Use open call application ID"
      parameter name: :empty, in: :body, schema: {type: :object}, required: false

      let(:open_call_application) { create :open_call_application, funded: true }
      let(:id) { open_call_application.id }
      let(:user) { open_call_application.investor.owner }

      it_behaves_like "with not authorized error", csrf: true
      it_behaves_like "with not found error", csrf: true, user: -> { user }
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user) }
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user_investor) }
      it_behaves_like "with forbidden error", csrf: true, user: -> { open_call_application.project_developer.owner }

      response "200", :success do
        let("X-CSRF-TOKEN") { get_csrf_token }

        before { sign_in user }

        run_test!

        it "is marked as not funded" do
          expect(open_call_application.reload).not_to be_funded
        end
      end
    end
  end
end
