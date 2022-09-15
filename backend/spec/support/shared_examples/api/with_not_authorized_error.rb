require "swagger_helper"

RSpec.shared_examples "with not authorized error" do |csrf: false, require_project_developer: false, require_investor: false|
  response "401", "Authentication failed" do
    let("X-CSRF-TOKEN") { get_csrf_token } if csrf

    context "User not signed in" do
      run_test!

      it "returns correct error", generate_swagger_example: true do
        expect(response_json["errors"][0]["title"]).to eq("You need to sign in or sign up before continuing.")
      end
    end

    if require_project_developer
      context "User is not Project Developer" do
        let(:user_no_account) { create(:user) }
        before(:each) { sign_in user_no_account }

        run_test!

        it "returns correct error" do
          expect(response_json["errors"][0]["title"]).to eq(I18n.t("errors.messages.user.no_project_developer"))
        end
      end
    end

    if require_investor
      context "User is not Investor" do
        let(:user_no_account) { create(:user) }
        before(:each) { sign_in user_no_account }

        run_test!

        it "returns correct error" do
          expect(response_json["errors"][0]["title"]).to eq(I18n.t("errors.messages.user.no_investor"))
        end
      end
    end
  end
end
