require "swagger_helper"

RSpec.describe "API V1 Favourite Open Calls", type: :request do
  path "/api/v1/open_calls/{open_call_id}/favourite_open_call" do
    post "Mark Open Call as favourite" do
      tags "Open Calls"
      consumes "application/json"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: :open_call_id, in: :path, type: :string
      parameter name: :empty, in: :body, schema: {type: :object}, required: false

      let(:open_call) { create :open_call }
      let(:open_call_id) { open_call.id }
      let(:user) { create :user, account: create(:account, :approved) }

      it_behaves_like "with not authorized error", csrf: true
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user) }
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user, account: create(:account, :unapproved)) }

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/open_call"}
        }

        let("X-CSRF-TOKEN") { get_csrf_token }

        before { sign_in user }

        run_test!

        it "favourite of open call is truthy" do
          expect(response_json["data"]["attributes"]["favourite"]).to be_truthy
        end
      end

      response "403", "Open Call is from not approved investor" do
        schema "$ref" => "#/components/schemas/errors"

        let("X-CSRF-TOKEN") { get_csrf_token }
        let(:open_call) { create :open_call, investor: create(:investor, account: create(:account, :unapproved)) }

        before { sign_in user }

        run_test!
      end
    end

    delete "Mark Open Call as non-favourite" do
      tags "Open Calls"
      consumes "application/json"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: :open_call_id, in: :path, type: :string
      parameter name: :empty, in: :body, schema: {type: :object}, required: false

      let(:open_call) { create :open_call }
      let(:open_call_id) { open_call.id }
      let(:user) { create :user, account: create(:account, :approved) }

      it_behaves_like "with not authorized error", csrf: true
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user) }
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user, account: create(:account, :unapproved)) }

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/open_call"}
        }

        let("X-CSRF-TOKEN") { get_csrf_token }

        before do
          create :favourite_open_call, user: user, open_call: open_call
          sign_in user
        end

        run_test!

        it "favourite of open call is falsey" do
          expect(response_json["data"]["attributes"]["favourite"]).to be_falsey
        end
      end
    end
  end
end
