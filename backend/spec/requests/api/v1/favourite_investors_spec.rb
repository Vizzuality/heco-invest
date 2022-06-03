require "swagger_helper"

RSpec.describe "API V1 Favourite Investor", type: :request do
  path "/api/v1/investors/{investor_id}/favourite_investor" do
    post "Mark Investor as favourite" do
      tags "Investors"
      consumes "application/json"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: :investor_id, in: :path, type: :string
      parameter name: :empty, in: :body, schema: {type: :object}, required: false

      let(:investor) { create :investor }
      let(:investor_id) { investor.id }
      let(:user) { create :user, account: create(:account, :approved) }

      it_behaves_like "with not authorized error", csrf: true
      it_behaves_like "with forbidden error", csrf: true

      response "200", :success do
        let("X-CSRF-TOKEN") { get_csrf_token }

        before { sign_in user }

        run_test!

        it "favourite of investor is truthy" do
          expect(response_json["data"]["attributes"]["favourite"]).to be_truthy
        end
      end
    end

    delete "Mark Investor as non-favourite" do
      tags "Investors"
      consumes "application/json"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: :investor_id, in: :path, type: :string
      parameter name: :empty, in: :body, schema: {type: :object}, required: false

      let(:investor) { create :investor }
      let(:investor_id) { investor.id }
      let(:user) { create :user, account: create(:account, :approved) }

      it_behaves_like "with not authorized error", csrf: true
      it_behaves_like "with forbidden error", csrf: true

      response "200", :success do
        let("X-CSRF-TOKEN") { get_csrf_token }

        before do
          create :favourite_investor, user: user, investor: investor
          sign_in user
        end

        run_test!

        it "favourite of investor is falsey" do
          expect(response_json["data"]["attributes"]["favourite"]).to be_falsey
        end
      end
    end
  end
end
