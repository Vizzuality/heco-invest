require "swagger_helper"

RSpec.describe "API V1 Account Project Developers", type: :request do
  let(:blob) { ActiveStorage::Blob.create_and_upload! io: fixture_file_upload("picture.jpg"), filename: "test" }
  let(:priority_landscape) { create :priority_landscape }

  path "/api/v1/account/project_developer" do
    get "Get current Project Developer" do
      tags "Project Developers"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: :includes, in: :query, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false
      parameter name: :locale, in: :query, type: :string, required: false, description: "Retrieve content in required language, skip for account language."

      let(:project_developer) { create :project_developer, :with_involved_projects }
      let(:user) { create :user }

      it_behaves_like "with not authorized error", csrf: true, require_project_developer: true

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/project_developer"}
        }
        let("X-CSRF-TOKEN") { get_csrf_token }

        before(:each) do
          user.update! account: project_developer.account, role: :project_developer
          sign_in user
        end

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/accounts-project-developer")
        end

        context "with relationships" do
          let(:includes) { "owner" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/accounts-project-developer-include-relationships")
          end
        end
      end
    end

    post "Create new Project Developer for User" do
      tags "Project Developers"
      consumes "application/json"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: :project_developer_params, in: :body, schema: {
        type: :object,
        properties: {
          language: {type: :string, enum: Language::TYPES},
          picture: {type: :string},
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
          contact_email: {type: :string},
          contact_phone: {type: :string},
          categories: {type: :array, items: {type: :string, enum: Category::TYPES}},
          impacts: {type: :array, items: {type: :string, enum: Impact::TYPES}},
          priority_landscape_ids: {type: :array, items: {type: :string}}
        },
        required: %w[language picture name about project_developer_type entity_legal_registration_number mission contact_email categories impacts]
      }

      let(:user) { create :user }
      let(:project_developer_params) do
        {
          language: "en",
          picture: blob.signed_id,
          name: "Name",
          about: "About",
          website: "http://website.com",
          linkedin: "http://linkedin.com",
          facebook: "http://facebook.com",
          twitter: "http://twitter.com",
          instagram: "http://instagram.com",
          project_developer_type: "ngo",
          entity_legal_registration_number: "564823570",
          mission: "Mission",
          contact_email: "contact@example.com",
          categories: ["sustainable-agrosystems", "tourism-and-recreation"],
          impacts: ["biodiversity", "climate"],
          priority_landscape_ids: [priority_landscape.id]
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
          expect(response.body).to match_snapshot("api/v1/accounts-project-developer-create")
        end
      end

      response "422", "User already have account" do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/errors"}
        }
        let("X-CSRF-TOKEN") { get_csrf_token }

        before(:each) do
          user.update! account: create(:account)
          sign_in user
        end

        run_test!

        it "returns correct error", generate_swagger_example: true do
          expect(response_json["errors"][0]["title"]).to eq(I18n.t("errors.messages.user.multiple_accounts"))
        end
      end
    end

    put "Update existing Project Developer" do
      tags "Project Developers"
      consumes "application/json"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: :project_developer_params, in: :body, schema: {
        type: :object,
        properties: {
          picture: {type: :string},
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
          contact_email: {type: :string},
          contact_phone: {type: :string},
          categories: {type: :array, items: {type: :string, enum: Category::TYPES}},
          impacts: {type: :array, items: {type: :string, enum: Impact::TYPES}},
          priority_landscape_ids: {type: :array, items: {type: :string}}
        }
      }

      let(:project_developer) { create :project_developer }
      let(:user) { create :user }
      let(:project_developer_params) do
        {
          picture: blob.signed_id,
          name: "Name",
          about: "About",
          website: "http://website.com",
          linkedin: "http://linkedin.com",
          facebook: "http://facebook.com",
          twitter: "http://twitter.com",
          instagram: "http://instagram.com",
          project_developer_type: "ngo",
          entity_legal_registration_number: "564823570",
          mission: "Mission",
          categories: ["sustainable-agrosystems", "tourism-and-recreation"],
          impacts: ["biodiversity", "climate"],
          priority_landscape_ids: [priority_landscape.id]
        }
      end

      it_behaves_like "with not authorized error", csrf: true, require_project_developer: true

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/project_developer"}
        }
        let("X-CSRF-TOKEN") { get_csrf_token }

        before(:each) do
          user.update! account: project_developer.account, role: :project_developer
          sign_in user
        end

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/accounts-project-developer-update")
        end

        context "when updating just some attributes" do
          let(:project_developer_params) do
            {
              name: "Updated Name"
            }
          end

          it "allows to update project developer name" do
            expect(response_json["data"]["attributes"]["name"]).to eq("Updated Name")
          end
        end

        context "when trying to update language" do
          let(:project_developer_params) do
            {
              language: "pt"
            }
          end

          it "keeps old language" do
            expect(response_json["data"]["attributes"]["language"]).to eq("en")
          end
        end
      end
    end
  end

  path "/api/v1/account/project_developers/favourites" do
    get "Returns list of project developers marked as favourite" do
      tags "Project Developers"
      consumes "application/json"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: "page[number]", in: :query, type: :integer, description: "Page number. Default: 1", required: false
      parameter name: "page[size]", in: :query, type: :integer, description: "Per page items. Default: 10", required: false
      parameter name: "fields[project_developer]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :includes, in: :query, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false

      it_behaves_like "with not authorized error", csrf: true
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user, account: create(:account, :unapproved)) }

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/project_developer"}},
          meta: {"$ref" => "#/components/schemas/pagination_meta"},
          links: {"$ref" => "#/components/schemas/pagination_links"}
        }

        let("X-CSRF-TOKEN") { get_csrf_token }
        let(:user) { create :user, account: create(:account, :approved) }
        let!(:favourite_project_developer) { create :favourite_project_developer, user: user }
        let!(:favourite_project_developer_of_different_user) { create :favourite_project_developer }
        let!(:project_developer_not_marked_as_favourite) { create :project_developer }

        before { sign_in user }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/account/project-developers-favourites")
          expect(response_json["data"].pluck("id")).to eq([favourite_project_developer.project_developer_id])
        end

        context "with sparse fieldset" do
          let("fields[project_developer]") { "instagram,facebook,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/account/project-developers-favourites-sparse-fieldset")
          end
        end

        context "with relationships" do
          let("fields[project_developer]") { "instagram,involved_projects" }
          let(:includes) { "involved_projects" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/account/project-developers-favourites-include-relationships")
          end
        end
      end
    end
  end
end
