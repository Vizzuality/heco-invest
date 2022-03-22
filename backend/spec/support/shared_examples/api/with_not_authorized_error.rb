require "swagger_helper"

RSpec.shared_examples "with not authorized error" do
  response "401", "Authentication failed" do
    let("X-CSRF-TOKEN") { get_csrf_token }

    run_test!

    it "returns correct error", generate_swagger_example: true do
      expect(response_json["errors"][0]["title"]).to eq("You need to sign in or sign up before continuing.")
    end
  end

  response "401", "Authentication failed - not confirmed user" do
    let("X-CSRF-TOKEN") { get_csrf_token }
    let(:unconfirmed_user) { create(:user, :unconfirmed) }

    before(:each) { sign_in unconfirmed_user }

    run_test!

    it "returns correct error", generate_swagger_example: true do
      expect(response_json["errors"][0]["title"]).to eq("You have to confirm your email address before continuing.")
    end
  end
end
