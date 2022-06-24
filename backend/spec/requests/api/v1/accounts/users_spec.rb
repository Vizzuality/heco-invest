require "swagger_helper"

RSpec.describe "API V1 Account Users", type: :request do
  path "/api/v1/account/users" do
    get "Get current account users" do
      tags "Users"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: "page[number]", in: :query, type: :integer, description: "Page number. Default: 1", required: false
      parameter name: "page[size]", in: :query, type: :integer, description: "Per page items. Default: 10", required: false

      let(:account) { create :account }
      let!(:account_user) { create :user, account: account, invitation_accepted_at: Time.current }
      let!(:invited_user) { create :user, invited_by: account.owner, invitation_sent_at: Time.current, invitation_token: "TOKEN" }
      let!(:ignored_user) { create :user }
      let!(:user_from_different_account) { create :user, account: create(:account) }

      it_behaves_like "with not authorized error", csrf: true

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/user"}},
          meta: {"$ref" => "#/components/schemas/pagination_meta"},
          links: {"$ref" => "#/components/schemas/pagination_links"}
        }
        let("X-CSRF-TOKEN") { get_csrf_token }

        before(:each) do
          sign_in account.owner
        end

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/accounts-users")
        end
      end
    end
  end
end
