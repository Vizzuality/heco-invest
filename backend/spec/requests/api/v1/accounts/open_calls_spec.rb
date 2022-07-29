require "swagger_helper"

RSpec.describe "API V1 Account Open Calls", type: :request do
  let(:user) { create :user_investor }

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
