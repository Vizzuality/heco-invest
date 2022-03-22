require "swagger_helper"

RSpec.describe "API V1 Email Confirmation", type: :request do
  let(:unconfirmed_user) { create(:user, :unconfirmed, email: "user@example.com", password: "SuperSecret1234") }

  path "/api/v1/email_confirmation" do
    get "Confirms User Email" do
      tags "Email Confirmation"
      consumes "application/json"
      produces "application/json"
      parameter name: :confirmation_token, in: :query, type: :string, description: "Generated confirmation token"

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/user"}
        }

        let(:confirmation_token) { unconfirmed_user.confirmation_token }

        run_test!

        it "is successful", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/email-confirmation")
          expect(session["warden.user.user.key"]).to be_present
          expect(unconfirmed_user.reload.confirmed?).to eq(true)
        end
      end

      response "422", "Invalid Token" do
        let(:confirmation_token) { "invalid_token" }

        run_test!

        it "returns correct error", generate_swagger_example: true do
          expect(response_json["errors"][0]["title"]).to eq("Confirmation token is invalid")
          expect(session["warden.user.user.key"]).to be_nil
          expect(unconfirmed_user.reload.confirmed?).to eq(false)
        end
      end
    end
  end
end
