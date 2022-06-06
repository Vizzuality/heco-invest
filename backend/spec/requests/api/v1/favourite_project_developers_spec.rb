require "swagger_helper"

RSpec.describe "API V1 Favourite Project Developer", type: :request do
  path "/api/v1/project_developers/{project_developer_id}/favourite_project_developer" do
    post "Mark Project Developer as favourite" do
      tags "Project Developers"
      consumes "application/json"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: :project_developer_id, in: :path, type: :string
      parameter name: :empty, in: :body, schema: {type: :object}, required: false

      let(:project_developer) { create :project_developer }
      let(:project_developer_id) { project_developer.id }
      let(:user) { create :user, account: create(:account, :approved) }

      it_behaves_like "with not authorized error", csrf: true
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user, account: create(:account, :unapproved)) }

      response "200", :success do
        let("X-CSRF-TOKEN") { get_csrf_token }

        before { sign_in user }

        run_test!

        it "favourite of project developer is truthy" do
          expect(response_json["data"]["attributes"]["favourite"]).to be_truthy
        end
      end
    end

    delete "Mark Project Developer as non-favourite" do
      tags "Project Developers"
      consumes "application/json"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: :project_developer_id, in: :path, type: :string
      parameter name: :empty, in: :body, schema: {type: :object}, required: false

      let(:project_developer) { create :project_developer }
      let(:project_developer_id) { project_developer.id }
      let(:user) { create :user, account: create(:account, :approved) }

      it_behaves_like "with not authorized error", csrf: true
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user, account: create(:account, :unapproved)) }

      response "200", :success do
        let("X-CSRF-TOKEN") { get_csrf_token }

        before do
          create :favourite_project_developer, user: user, project_developer: project_developer
          sign_in user
        end

        run_test!

        it "favourite of project developer is falsey" do
          expect(response_json["data"]["attributes"]["favourite"]).to be_falsey
        end
      end
    end
  end
end
