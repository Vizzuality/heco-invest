require "swagger_helper"

RSpec.describe "API V1 User Project Developers", type: :request do
  path "/api/v1/account/project_developer" do
    post "Create new Project Developer for User" do
      tags "Project Developers"
      consumes "multipart/form-data"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: :project_developer_params, in: :formData, schema: {
        type: :object,
        properties: {
          language: {type: :string, enum: Language::TYPES},
          picture: {type: :file},
          name: {type: :string},
          about: {type: :string},
          website: {type: :string},
          linkedin: {type: :string},
          facebook: {type: :string},
          twitter: {type: :string},
          instagram: {type: :string},
          project_developer_type: {type: :string, enum: ProjectDeveloperType::TYPES},
          entity_legal_registration_number: {type: :string},
          mission: {type: :string},
          "categories[]": {type: :array, items: {type: :string, enum: Category::TYPES}, collectionFormat: :multi},
          "impacts[]": {type: :array, items: {type: :string, enum: Impact::TYPES}, collectionFormat: :multi},
          "location_ids[]": {type: :array, items: {type: :string}, collectionFormat: :multi}
        },
        required: %w[language picture name about project_developer_type entity_legal_registration_number mission categories[] impacts[]]
      }

      let(:location) { create :location }
      let(:user) { create :user }
      let(:project_developer_params) do
        {
          language: "en",
          picture: fixture_file_upload("picture.jpg"),
          name: "Name",
          about: "About",
          website: "http://website.com",
          linkedin: "http://linkedin.com",
          facebook: "http://facebook.com",
          twitter: "http://twitter.com",
          instagram: "http://instagram.com",
          project_developer_type: "TBD",
          entity_legal_registration_number: "564823570",
          mission: "Mision",
          categories: ["sustainable-agrosystems", "tourism-and-recreation"],
          impacts: ["biodiversity", "climate"],
          location_ids: [location.id]
        }
      end

      it_behaves_like "with not authorized error", csrf: true

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/project_developer"}
        }
        let("X-CSRF-TOKEN") { get_csrf_token }

        before(:each) { sign_in user }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/create-project-developer")
        end
      end

      response "422", "User already have account" do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/error"}
        }
        let("X-CSRF-TOKEN") { get_csrf_token }

        before(:each) do
          user.update! account: create(:account)
          sign_in user
        end

        run_test!

        it "returns correct error", generate_swagger_example: true do
          expect(response_json["errors"][0]["title"]).to eq(I18n.t("errors.messages.user_multiple_accounts"))
        end
      end
    end
  end
end
