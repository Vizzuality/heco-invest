require "swagger_helper"

RSpec.describe "API V1 Account Investors", type: :request do
  let(:blob) { ActiveStorage::Blob.create_and_upload! io: fixture_file_upload("picture.jpg"), filename: "test" }

  path "/api/v1/account/investor" do
    get "Get current Investor" do
      tags "Investors"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: :includes, in: :query, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false
      parameter name: :locale, in: :query, type: :string, required: false, description: "Retrieve content in required language, skip for account language."

      let(:investor) { create :investor }
      let(:user) { create :user }

      it_behaves_like "with not authorized error", csrf: true, require_investor: true

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/investor"}
        }
        let("X-CSRF-TOKEN") { get_csrf_token }

        before(:each) do
          user.update! account: investor.account, role: :investor
          sign_in user
        end

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/accounts-investor")
        end

        context "with relationships" do
          let(:includes) { "owner" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/accounts-investor-include-relationships")
          end
        end
      end
    end

    post "Create new Investor for User" do
      tags "Investors"
      consumes "application/json"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: :investor_params, in: :body, schema: {
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
          investor_type: {type: :string, enum: InvestorType::TYPES},
          mission: {type: :string},
          prioritized_projects_description: {type: :string},
          other_information: {type: :string},
          previously_invested: {type: :boolean},
          contact_email: {type: :string},
          contact_phone: {type: :string},
          categories: {type: :array, items: {type: :string, enum: Category::TYPES}},
          ticket_sizes: {type: :array, items: {type: :string, enum: TicketSize::TYPES}},
          instrument_types: {type: :array, items: {type: :string, enum: InstrumentType::TYPES}},
          impacts: {type: :array, items: {type: :string, enum: Impact::TYPES}},
          sdgs: {type: :array, items: {type: :integer, enum: Sdg::TYPES}}
        },
        required: %w[language picture name about investor_type mission other_information contact_email instrument_types ticket_sizes]
      }

      let(:user) { create :user }
      let(:investor_params) do
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
          investor_type: "investor",
          mission: "Mission",
          prioritized_projects_description: "What type of projects are you prioritizing?",
          other_information: "Other Information",
          previously_invested: true,
          contact_email: "contact@example.com",
          contact_phone: "123456789",
          categories: ["sustainable-agrosystems", "tourism-and-recreation"],
          impacts: ["biodiversity", "climate"],
          ticket_sizes: ["small-grants"],
          instrument_types: ["grant"],
          sdgs: [1, 2, 5]
        }
      end

      it_behaves_like "with not authorized error", csrf: true

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/investor"}
        }
        let("X-CSRF-TOKEN") { get_csrf_token }

        before(:each) { sign_in user }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/accounts-investor-create")
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

    put "Update existing Investor" do
      tags "Investors"
      consumes "application/json"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: :investor_params, in: :body, schema: {
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
          investor_type: {type: :string, enum: InvestorType::TYPES},
          mission: {type: :string},
          prioritized_projects_description: {type: :string},
          other_information: {type: :string},
          previously_invested: {type: :boolean},
          contact_email: {type: :string},
          contact_phone: {type: :string},
          categories: {type: :array, items: {type: :string, enum: Category::TYPES}},
          ticket_sizes: {type: :array, items: {type: :string, enum: TicketSize::TYPES}},
          instrument_types: {type: :array, items: {type: :string, enum: InstrumentType::TYPES}},
          impacts: {type: :array, items: {type: :string, enum: Impact::TYPES}},
          sdgs: {type: :array, items: {type: :integer, enum: Sdg::TYPES}}
        }
      }

      let(:investor) { create :investor }
      let(:user) { create :user }
      let(:investor_params) do
        {
          picture: blob.signed_id,
          name: "Name",
          about: "About",
          website: "http://website.com",
          linkedin: "http://linkedin.com",
          facebook: "http://facebook.com",
          twitter: "http://twitter.com",
          instagram: "http://instagram.com",
          investor_type: "investor",
          mission: "Mission",
          prioritized_projects_description: "What type of projects are you prioritizing?",
          other_information: "Other Information",
          previously_invested: true,
          contact_email: "contact@example.com",
          contact_phone: "123456789",
          categories: ["sustainable-agrosystems", "tourism-and-recreation"],
          impacts: ["biodiversity", "climate"],
          ticket_sizes: ["small-grants"],
          instrument_types: ["grant"],
          sdgs: [1, 2, 5]
        }
      end

      it_behaves_like "with not authorized error", csrf: true, require_investor: true

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/investor"}
        }
        let("X-CSRF-TOKEN") { get_csrf_token }

        before(:each) do
          user.update! account: investor.account, role: :investor
          sign_in user
        end

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/accounts-investor-update")
        end

        context "when updating just some attributes" do
          let(:investor_params) do
            {
              name: "Updated Name"
            }
          end

          it "allows to update investor name" do
            expect(response_json["data"]["attributes"]["name"]).to eq("Updated Name")
          end
        end

        context "when trying to update language" do
          let(:investor_params) do
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

  path "/api/v1/account/investors/favourites" do
    get "Returns list of investors marked as favourite" do
      tags "Investors"
      consumes "application/json"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: "page[number]", in: :query, type: :integer, description: "Page number. Default: 1", required: false
      parameter name: "page[size]", in: :query, type: :integer, description: "Per page items. Default: 10", required: false
      parameter name: "fields[investor]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :includes, in: :query, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false

      it_behaves_like "with not authorized error", csrf: true
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user, account: create(:account, :unapproved)) }

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/investor"}},
          meta: {"$ref" => "#/components/schemas/pagination_meta"},
          links: {"$ref" => "#/components/schemas/pagination_links"}
        }

        let("X-CSRF-TOKEN") { get_csrf_token }
        let(:user) { create :user, account: create(:account, :approved) }
        let!(:favourite_investor) { create :favourite_investor, user: user }
        let!(:favourite_investor_of_different_user) { create :favourite_investor }
        let!(:investor_not_marked_as_favourite) { create :investor }

        before { sign_in user }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/account/investors-favourites")
          expect(response_json["data"].pluck("id")).to eq([favourite_investor.investor_id])
        end

        context "with sparse fieldset" do
          let("fields[investor]") { "instagram,facebook,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/account/investors-favourites-sparse-fieldset")
          end
        end

        context "with relationships" do
          let("fields[investor]") { "instagram,facebook,nonexisting" }
          let(:includes) { "owner" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/account/investors-favourites-include-relationships")
          end
        end
      end
    end
  end
end
