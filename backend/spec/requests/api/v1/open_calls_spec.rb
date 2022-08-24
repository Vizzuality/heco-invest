require "swagger_helper"

RSpec.describe "API V1 Open Calls", type: :request do
  before_all do
    @open_call = create(:open_call, instrument_types: ["grant"])
    create_list(:open_call, 6, instrument_types: ["loan"])
    @unapproved_open_call = create(:open_call, investor: create(:investor, account: create(:account, :unapproved, users: [create(:user)])))
    @approved_account = create(:account, review_status: :approved, users: [create(:user)])
    @open_call_in_pt = create(
      :open_call,
      investor: create(:investor, account: create(:account, language: "pt")),
      description_en: "Description EN", description_es: "Description ES", description_pt: "Description PT"
    )
    @draft_open_call = create(:open_call, status: :draft)
  end

  include_examples :api_pagination, model: OpenCall, expected_total: 8

  path "/api/v1/open_calls" do
    get "Returns list of the open calls" do
      tags "Open Calls"
      produces "application/json"
      parameter name: "page[number]", in: :query, type: :integer, description: "Page number. Default: 1", required: false
      parameter name: "page[size]", in: :query, type: :integer, description: "Per page items. Default: 10", required: false
      parameter name: "fields[open_call]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :includes, in: :query, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false
      parameter name: "filter[sdg]", in: :query, type: :integer, required: false, description: "Filter records. Use comma to separate multiple filter options."
      parameter name: "filter[instrument_type]", in: :query, type: :string, required: false, description: "Filter records. Use comma to separate multiple filter options."
      parameter name: "filter[only_verified]", in: :query, type: :boolean, required: false, description: "Filter records."
      parameter name: "filter[full_text]", in: :query, type: :string, required: false, description: "Filter records by provided text."
      parameter name: :sorting, in: :query, type: :string, enum: ["name asc", "name desc", "created_at asc", "created_at desc"], required: false, description: "Sort records."
      parameter name: :locale, in: :query, type: :string, required: false, description: "Retrieve content in required language, skip for account language."

      let(:sorting) { "name asc" }

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/open_call"}},
          meta: {"$ref" => "#/components/schemas/pagination_meta"},
          links: {"$ref" => "#/components/schemas/pagination_links"}
        }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/open-calls")
        end

        it "ignores unapproved record" do
          expect(response_json["data"].pluck("id")).not_to include(@unapproved_open_call.id)
        end

        it "ignores open call with draft status" do
          expect(response_json["data"].pluck("id")).not_to include(@draft_open_call.id)
        end

        context "with sparse fieldset" do
          let("fields[open_call]") { "name,description,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/open-calls-sparse-fieldset")
          end
        end

        context "with relationships" do
          let("fields[open_call]") { "name,investor" }
          let(:includes) { "investor" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/open-calls-include-relationships")
          end
        end

        context "when filtering is used" do
          let("filter[instrument_type]") { @open_call.instrument_types.first }

          it "includes filtered open call" do
            expect(response_json["data"].pluck("id")).to eq([@open_call.id])
          end
        end

        context "when filtered by searched text" do
          let("filter[full_text]") { @open_call.name }

          it "contains only correct records" do
            expect(response_json["data"].pluck("id")).to eq([@open_call.id])
          end
        end
      end
    end
  end

  path "/api/v1/open_calls/{id}" do
    get "Find open call by id or slug" do
      tags "Open Calls"
      produces "application/json"
      parameter name: :id, in: :path, type: :string, description: "Use open call ID or slug"
      parameter name: "fields[open_call]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :includes, in: :query, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false
      parameter name: :locale, in: :query, type: :string, required: false, description: "Retrieve content in required language, skip for account language."

      let(:id) { @open_call.id }

      it_behaves_like "with not found error"

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/open_call"}
        }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/get-open-call")
        end

        context "when slug is used" do
          let(:id) { @open_call.slug }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/get-open-call")
          end
        end

        context "with sparse fieldset" do
          let("fields[open_call]") { "name,description,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/get-open-call-sparse-fieldset")
          end
        end

        context "with relationships" do
          let("fields[open_call]") { "name,investor" }
          let(:includes) { "investor" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/get-open-call-include-relationships")
          end
        end

        context "when unapproved investor shows its own open call" do
          let(:id) { @unapproved_open_call.id }

          before { sign_in @unapproved_open_call.investor.account.users.first }

          run_test!
        end

        context "account language" do
          context "when locale set" do
            let(:id) { @open_call_in_pt.id }
            let(:locale) { "es" }

            it "returns content in requested language" do
              expect(response_json["data"]["attributes"]["description"]).to eq("Description ES")
            end
          end

          context "when locale not set" do
            let(:id) { @open_call_in_pt.id }

            it "returns content in account language" do
              expect(response_json["data"]["attributes"]["description"]).to eq("Description PT")
            end
          end
        end
      end

      response "403", :forbidden do
        schema "$ref" => "#/components/schemas/errors"

        let(:id) { @unapproved_open_call.id }

        run_test!

        context "when logged in user tries to see open call of unapproved investor" do
          before { sign_in @approved_account.users.first }

          run_test!
        end
      end
    end
  end
end
