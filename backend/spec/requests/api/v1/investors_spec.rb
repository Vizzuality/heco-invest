require "swagger_helper"

RSpec.describe "API V1 Investors", type: :request do
  before_all do
    @investor = create(:investor, mission: "Yellow Banana", sdgs: [3, 4])
    @draft_open_call = create(:open_call, status: :draft, investor: @investor)
    create_list(:investor, 6, sdgs: [1, 5])
    @unapproved_investor = create(:investor, account: create(:account, review_status: :unapproved, users: [create(:user)]))
    @approved_account = create(:account, review_status: :approved, users: [create(:user)])
    @investor_in_pt = create(
      :investor,
      account: create(:account, about_en: "About EN", about_es: "About ES", about_pt: "About PT", language: "pt"),
      sdgs: [1, 5]
    )
  end

  include_examples :api_pagination, model: Investor, expected_total: 8

  path "/api/v1/investors" do
    get "Returns list of the investors" do
      tags "Investors"
      produces "application/json"
      parameter name: "page[number]", in: :query, type: :integer, description: "Page number. Default: 1", required: false
      parameter name: "page[size]", in: :query, type: :integer, description: "Per page items. Default: 10", required: false
      parameter name: "fields[investor]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: "filter[category]", in: :query, type: :string, required: false, description: "Filter records. Use comma to separate multiple filter options."
      parameter name: "filter[impact]", in: :query, type: :string, required: false, description: "Filter records. Use comma to separate multiple filter options."
      parameter name: "filter[sdg]", in: :query, type: :integer, required: false, description: "Filter records. Use comma to separate multiple filter options."
      parameter name: "filter[instrument_type]", in: :query, type: :string, required: false, description: "Filter records. Use comma to separate multiple filter options."
      parameter name: "filter[ticket_size]", in: :query, type: :string, required: false, description: "Filter records. Use comma to separate multiple filter options."
      parameter name: "filter[full_text]", in: :query, type: :string, required: false, description: "Filter records by provided text."
      parameter name: :sorting, in: :query, type: :string, enum: ["name asc", "name desc", "created_at asc", "created_at desc"], required: false, description: "Sort records."
      parameter name: :locale, in: :query, type: :string, required: false, description: "Retrieve content in required language, skip for account language."

      let(:sorting) { "name asc" }

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/investor"}},
          meta: {"$ref" => "#/components/schemas/pagination_meta"},
          links: {"$ref" => "#/components/schemas/pagination_links"}
        }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/investors")
        end

        it "ignores unapproved record" do
          expect(response_json["data"].pluck("id")).not_to include(@unapproved_investor.id)
        end

        it "ignores draft open calls defined through relationships" do
          open_call_ids = response_json["data"].map { |d| d["relationships"]["open_calls"]["data"].pluck("id") }.flatten
          expect(open_call_ids).not_to include(@draft_open_call.id)
        end

        context "with sparse fieldset" do
          let("fields[investor]") { "instagram,facebook,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/investors-sparse-fieldset")
          end
        end

        context "with relationships" do
          let("fields[investor]") { "name,open_calls" }
          let(:includes) { "open_calls" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/investors-include-relationships")
          end
        end

        context "when filtering is used" do
          let("filter[sdg]") { @investor.sdgs.join(",") }

          it "includes filtered investor" do
            expect(response_json["data"].pluck("id")).to eq([@investor.id])
          end
        end

        context "when filtered by investor mission" do
          let("filter[full_text]") { @investor.mission }

          it "contains only correct records" do
            expect(response_json["data"].pluck("id")).to eq([@investor.id])
          end
        end

        context "when filtered by partial PD mission" do
          let("filter[full_text]") { @investor.mission[0..2] }

          before(:each) do
            allow(Investor).to receive(:translatable_attributes).and_return([:mission])
          end

          it "contains only correct records" do
            expect(response_json["data"].pluck("id")).to eq([@investor.id])
          end
        end
      end
    end
  end

  path "/api/v1/investors/{id}" do
    get "Find investor by id or slug" do
      tags "Investors"
      produces "application/json"
      parameter name: :id, in: :path, type: :string, description: "Use investor ID or account slug"
      parameter name: "fields[investor]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :locale, in: :query, type: :string, required: false, description: "Retrieve content in required language, skip for account language."

      let(:id) { @investor.id }

      it_behaves_like "with not found error"

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/investor"}
        }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/get-investor")
        end

        context "when slug is used" do
          let(:id) { @investor.account.slug }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/get-investor")
          end
        end

        context "with sparse fieldset" do
          let("fields[investor]") { "instagram,facebook,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/get-investor-sparse-fieldset")
          end
        end

        context "when approved account checks investor" do
          before { sign_in @approved_account.users.first }

          run_test!

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/get-investor-approved-account")
          end
        end

        context "when account user checks its own unapproved investor" do
          let(:id) { @unapproved_investor.id }

          before { sign_in @unapproved_investor.account.users.first }

          run_test!
        end

        context "account language" do
          context "when locale set" do
            let(:id) { @investor_in_pt.id }
            let(:locale) { "es" }

            it "returns content in requested language" do
              expect(response_json["data"]["attributes"]["about"]).to eq("About ES")
            end
          end

          context "when locale not set" do
            let(:id) { @investor_in_pt.id }

            it "returns content in account language" do
              expect(response_json["data"]["attributes"]["about"]).to eq("About PT")
            end
          end
        end
      end

      response "403", :forbidden do
        schema "$ref" => "#/components/schemas/errors"

        let(:id) { @unapproved_investor.id }

        run_test!

        context "when logged in user tries to see unapproved investor" do
          before { sign_in @approved_account.users.first }

          run_test!
        end
      end
    end
  end
end
