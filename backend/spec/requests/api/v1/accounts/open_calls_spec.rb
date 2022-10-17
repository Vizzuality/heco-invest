require "swagger_helper"

RSpec.describe "API V1 Account Open Calls", type: :request do
  let(:country) { create(:country) }
  let(:municipality) { create(:municipality) }
  let(:department) { create(:department) }
  let(:user) { create :user, :investor, account: create(:account_investor, language: :es) }
  let(:blob) { ActiveStorage::Blob.create_and_upload! io: fixture_file_upload("picture.jpg"), filename: "test" }

  path "/api/v1/account/open_calls" do
    get "Returns list of open calls of User" do
      tags "Open Calls"
      consumes "application/json"
      produces "application/json"
      security [cookie_auth: []]

      parameter name: "fields[open_call]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :includes, in: :query, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false
      parameter name: "filter[full_text]", in: :query, type: :string, required: false, description: "Filter records by provided text."

      it_behaves_like "with not authorized error", csrf: true
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user) }
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user_project_developer) }

      let!(:status_open_call) { create :open_call, investor: user.account.investor, status: :draft }
      let!(:name_open_call) { create :open_call, investor: user.account.investor, name: "Yellow Banana" }
      let!(:country_name_open_call) { create :open_call, investor: user.account.investor, country: create(:country, name: "Filtered Country Name") }
      let!(:department_name_open_call) { create :open_call, investor: user.account.investor, department: create(:department, name: "Filtered Department Name") }
      let!(:municipality_name_open_call) { create :open_call, investor: user.account.investor, municipality: create(:municipality, name: "Filtered Municipality Name") }
      let!(:instrument_types_open_call) { create :open_call, investor: user.account.investor, instrument_types: ["grant"] }
      let!(:different_investor_open_call) { create :open_call }

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/open_call"}}
        }

        before do
          sign_in user
        end

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/account/open-calls")
        end

        it "does not contain records of different investor" do
          expect(response_json["data"].pluck("id")).not_to include(different_investor_open_call.id)
        end

        context "with sparse fieldset" do
          let("fields[open_call]") { "name,description,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/account/open-calls-sparse-fieldset")
          end
        end

        context "with relationships" do
          let("fields[open_call]") { "name,investor" }
          let(:includes) { "investor" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/account/open-calls-include-relationships")
          end
        end

        context "when searched by status" do
          let("filter[full_text]") { I18n.t "enums.open_call_status.draft.name" }

          it "contains only correct records" do
            expect(response_json["data"].pluck("id")).to eq([status_open_call.id])
          end
        end

        context "when searching by name" do
          let("filter[full_text]") { "Yellow Banana" }

          it "contains only correct records" do
            expect(response_json["data"].pluck("id")).to eq([name_open_call.id])
          end
        end

        context "when searching by partial name" do
          let("filter[full_text]") { "Ban" }

          it "contains only correct records" do
            expect(response_json["data"].pluck("id")).to eq([name_open_call.id])
          end
        end

        context "when searched by country name" do
          let("filter[full_text]") { "Filtered Country Name" }

          it "contains only correct records" do
            expect(response_json["data"].pluck("id")).to eq([country_name_open_call.id])
          end
        end

        context "when searched by department name" do
          let("filter[full_text]") { "Filtered Department Name" }

          it "contains only correct records" do
            expect(response_json["data"].pluck("id")).to eq([department_name_open_call.id])
          end
        end

        context "when searched by municipality name" do
          let("filter[full_text]") { "Filtered Municipality Name" }

          it "contains only correct records" do
            expect(response_json["data"].pluck("id")).to eq([municipality_name_open_call.id])
          end
        end

        context "when searched by instrument types" do
          let("filter[full_text]") { I18n.t "enums.instrument_type.grant.name" }

          it "contains only correct records" do
            expect(response_json["data"].pluck("id")).to eq([instrument_types_open_call.id])
          end
        end
      end
    end

    post "Create new OpenCall for User" do
      tags "Open Calls"
      consumes "application/json"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: :open_call_params, in: :body, schema: {
        type: :object,
        properties: {
          picture: {type: :string},
          name: {type: :string},
          description: {type: :string},
          status: {type: :string, enum: OpenCallStatus::TYPES},
          country_id: {type: :string},
          municipality_id: {type: :string},
          department_id: {type: :string},
          impact_description: {type: :string},
          maximum_funding_per_project: {type: :integer},
          funding_priorities: {type: :string},
          funding_exclusions: {type: :string},
          closing_at: {type: :string},
          sdgs: {type: :array, items: {type: :integer, enum: Sdg::TYPES}},
          instrument_types: {type: :array, items: {type: :string, enum: InstrumentType::TYPES}}
        },
        required: %w[
          name description country_id impact_description maximum_funding_per_project funding_priorities funding_exclusions
          closing_at instrument_types
        ]
      }

      let(:open_call_params) do
        {
          picture: blob.signed_id,
          name: "Open Call Name",
          description: "Open Call Description",
          status: :draft,
          country_id: country.id,
          municipality_id: municipality.id,
          department_id: department.id,
          impact_description: "Open Call Impact Description",
          maximum_funding_per_project: 100_000,
          funding_priorities: "Open Call Funding Priorities",
          funding_exclusions: "Open Call Funding Exclusions",
          closing_at: 1.day.from_now,
          sdgs: [1, 2],
          instrument_types: %w[loan grant],
          locale: :en
        }
      end

      it_behaves_like "with not authorized error", csrf: true
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user) }
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user_project_developer) }

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/open_call"}
        }
        let("X-CSRF-TOKEN") { get_csrf_token }

        before(:each) { sign_in user }

        it "matches snapshot", generate_swagger_example: true do |example|
          expect {
            submit_request example.metadata
            assert_response_matches_metadata example.metadata
          }.to change(OpenCall, :count).by(1)
          expect(response.body).to match_snapshot("api/v1/account/open-calls-create")
        end

        it "saves data to account language attributes" do |example|
          submit_request example.metadata
          open_call = OpenCall.find response_json["data"]["id"]
          OpenCall.translatable_attributes.each do |attr|
            expect(open_call.public_send("#{attr}_#{user.account.language}")).to eq(open_call_params[attr])
          end
        end
      end

      response "422", "Validation errors" do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/errors"}
        }
        let("X-CSRF-TOKEN") { get_csrf_token }

        before(:each) do
          create(:open_call, name_es: open_call_params[:name], investor: user.account.investor)
          sign_in user
        end

        run_test!

        it "returns correct error", generate_swagger_example: true do
          expect(response_json["errors"][0]["title"]).to eq("Name es (ES) has already been taken")
        end
      end
    end
  end

  path "/api/v1/account/open_calls/{id}" do
    put "Update existing Open Call of User" do
      tags "Open Calls"
      consumes "application/json"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: :id, in: :path, type: :string, description: "Use open call ID or slug"
      parameter name: :open_call_params, in: :body, schema: {
        type: :object,
        properties: {
          picture: {type: :string},
          name: {type: :string},
          description: {type: :string},
          status: {type: :string, enum: OpenCallStatus::TYPES},
          country_id: {type: :string},
          municipality_id: {type: :string},
          department_id: {type: :string},
          impact_description: {type: :string},
          maximum_funding_per_project: {type: :integer},
          funding_priorities: {type: :string},
          funding_exclusions: {type: :string},
          closing_at: {type: :string},
          sdgs: {type: :array, items: {type: :integer, enum: Sdg::TYPES}},
          instrument_types: {type: :array, items: {type: :string, enum: InstrumentType::TYPES}}
        }
      }

      let!(:open_call) { create :open_call, investor: user.account.investor }
      let(:id) { open_call.id }
      let(:open_call_params) do
        {
          picture: blob.signed_id,
          name: "Updated Open Call Name",
          description: "Updated Open Call Description",
          status: :launched,
          country_id: country.id,
          municipality_id: municipality.id,
          department_id: department.id,
          impact_description: "Updated Open Call Impact Description",
          maximum_funding_per_project: 100_000,
          funding_priorities: "Updated Open Call Funding Priorities",
          funding_exclusions: "Updated Open Call Funding Exclusions",
          closing_at: 10.days.from_now,
          sdgs: [1, 8],
          instrument_types: %w[grant],
          locale: :en
        }
      end

      it_behaves_like "with not authorized error", csrf: true
      it_behaves_like "with not found error", csrf: true, user: -> { user }
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user) }
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user_project_developer) }
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user_investor) }

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/open_call"}
        }
        let("X-CSRF-TOKEN") { get_csrf_token }

        before { sign_in user }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/account/open-calls-update")
        end

        it "saves data to account language attributes" do
          open_call.reload
          OpenCall.translatable_attributes.each do |attr|
            expect(open_call.public_send("#{attr}_#{user.account.language}")).to eq(open_call_params[attr])
          end
        end

        context "when slug is used" do
          let(:id) { open_call.slug }

          run_test!

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/account/open-calls-update")
          end
        end
      end

      response "422", "Validation errors" do
        schema "$ref" => "#/components/schemas/errors"

        let("X-CSRF-TOKEN") { get_csrf_token }
        let(:open_call_params) { {instrument_types: %w[WRONG_ENUM]} }

        before { sign_in user }

        run_test!

        it "returns correct error", generate_swagger_example: true do
          expect(response_json["errors"][0]["title"]).to eq("Instrument types [\"WRONG_ENUM\"] is not included in the list")
        end
      end
    end

    delete "Delete existing open call of User" do
      tags "Open Calls"
      consumes "application/json"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: :id, in: :path, type: :string, description: "Use open call ID or slug"
      parameter name: :empty, in: :body, schema: {type: :object}, required: false

      let(:user) { create :user, :investor }
      let!(:open_call) { create :open_call, investor: create(:investor, account: create(:account, owner: user)) }
      let!(:open_call_application) { create :open_call_application, open_call: open_call }
      let(:id) { open_call.id }

      it_behaves_like "with not authorized error", csrf: true
      it_behaves_like "with not found error", csrf: true, user: -> { user }
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user) }
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user_project_developer) }
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user_investor) }

      response "200", :success do
        let("X-CSRF-TOKEN") { get_csrf_token }

        before { sign_in user }

        it "removes open call" do |example|
          expect {
            submit_request example.metadata
            assert_response_matches_metadata example.metadata
          }.to change(OpenCall, :count).by(-1)
        end

        it "sends email that open call was destroyed to investor owner" do |example|
          expect {
            submit_request example.metadata
          }.to have_enqueued_mail(InvestorMailer, :open_call_destroyed).with(open_call.investor, open_call.name)
        end

        it "sends email that open call was destroyed to project developer owner who applied to open call" do |example|
          expect {
            submit_request example.metadata
          }.to have_enqueued_mail(ProjectDeveloperMailer, :open_call_destroyed)
            .with(open_call_application.project_developer, open_call_application.project, open_call.name)
        end

        context "when slug is used" do
          let(:id) { open_call.slug }

          it "removes open call" do |example|
            expect {
              submit_request example.metadata
            }.to change(OpenCall, :count).by(-1)
          end
        end
      end
    end
  end

  path "/api/v1/account/open_calls/favourites" do
    get "Returns list of open calls marked as favourite" do
      tags "Open Calls"
      consumes "application/json"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: "page[number]", in: :query, type: :integer, description: "Page number. Default: 1", required: false
      parameter name: "page[size]", in: :query, type: :integer, description: "Per page items. Default: 10", required: false
      parameter name: "fields[open_calls]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :includes, in: :query, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false

      it_behaves_like "with not authorized error", csrf: true
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user, account: create(:account, :unapproved)) }

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/open_call"}},
          meta: {"$ref" => "#/components/schemas/pagination_meta"},
          links: {"$ref" => "#/components/schemas/pagination_links"}
        }

        let("X-CSRF-TOKEN") { get_csrf_token }
        let!(:favourite_open_call) { create :favourite_open_call, user: user }
        let!(:favourite_open_call_of_different_user) { create :favourite_open_call }
        let!(:open_call_not_marked_as_favourite) { create :open_call }

        before { sign_in user }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/account/open-calls-favourites")
          expect(response_json["data"].pluck("id")).to eq([favourite_open_call.open_call_id])
        end

        context "with sparse fieldset" do
          let("fields[open_call]") { "name,description,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/account/open-calls-favourites-sparse-fieldset")
          end
        end

        context "with relationships" do
          let("fields[open_call]") { "name,investor" }
          let(:includes) { "investor" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/account/open-calls-favourites-include-relationships")
          end
        end
      end
    end
  end
end
