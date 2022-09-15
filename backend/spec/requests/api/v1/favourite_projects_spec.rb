require "swagger_helper"

RSpec.describe "API V1 Favourite Project", type: :request do
  path "/api/v1/projects/{project_id}/favourite_project" do
    post "Mark Project as favourite" do
      tags "Projects"
      consumes "application/json"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: :project_id, in: :path, type: :string
      parameter name: :empty, in: :body, schema: {type: :object}, required: false

      let(:project) { create :project }
      let(:project_id) { project.id }
      let(:user) { create :user, account: create(:account, :approved) }

      it_behaves_like "with not authorized error", csrf: true

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/project"}
        }

        let("X-CSRF-TOKEN") { get_csrf_token }

        before { sign_in user }

        run_test!

        it "favourite of project is truthy" do
          expect(response_json["data"]["attributes"]["favourite"]).to be_truthy
        end
      end

      response "403", "Project or User account are not approved" do
        schema "$ref" => "#/components/schemas/errors"

        let("X-CSRF-TOKEN") { get_csrf_token }

        before { sign_in user }

        context "when user is not approved" do
          let(:user) { create :user, account: create(:account, :unapproved) }

          run_test!
        end

        context "when project is not approved" do
          let(:project) { create :project, project_developer: create(:project_developer, account: create(:account, :unapproved)) }

          run_test!
        end
      end
    end

    delete "Mark Project as non-favourite" do
      tags "Projects"
      consumes "application/json"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: :project_id, in: :path, type: :string
      parameter name: :empty, in: :body, schema: {type: :object}, required: false

      let(:project) { create :project }
      let(:project_id) { project.id }
      let(:user) { create :user, account: create(:account, :approved) }

      it_behaves_like "with not authorized error", csrf: true
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user, account: create(:account, :unapproved)) }

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/project"}
        }

        let("X-CSRF-TOKEN") { get_csrf_token }

        before do
          create :favourite_project, user: user, project: project
          sign_in user
        end

        run_test!

        it "favourite of project is falsey" do
          expect(response_json["data"]["attributes"]["favourite"]).to be_falsey
        end
      end
    end
  end
end
