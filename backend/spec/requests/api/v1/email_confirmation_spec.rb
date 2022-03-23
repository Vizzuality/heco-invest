require "swagger_helper"

RSpec.describe "API V1 Email Confirmation", type: :request do
  let(:unconfirmed_user) { create(:user, :unconfirmed, email: "user@example.com", password: "SuperSecret1234") }

  path "/api/v1/email_confirmation" do
    post "Sends an email with confirmation token" do
      tags "Email Confirmation"
      consumes "application/json"
      produces "application/json"
      security [csrf: []]
      parameter name: :params, in: :body, schema: {
        type: :object,
        properties: {
          email: {type: :string}
        },
        required: ["email"]
      }

      response "200", :success do
        let(:params) { {email: unconfirmed_user.email} }
        let("X-CSRF-TOKEN") { get_csrf_token }

        run_test!

        it "sends email" do
          mail = ActionMailer::Base.deliveries.last
          expect(mail.subject).to eq("Confirmation instructions")
          expect(mail.to.first).to eq("user@example.com")
        end

        context "invalid email" do
          let(:params) { {email: "invalid"} }

          it "returns 200" do
            expect(response).to have_http_status(:ok)
          end
        end

        context "non existing user" do
          let(:params) { {email: "valid@example.com"} }

          it "returns 200" do
            expect(response).to have_http_status(:ok)
          end
        end
      end
    end

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

        context "already confirmed" do
          let(:confirmation_token) do
            unconfirmed_user.confirm # not sure why it does not work in before block
            unconfirmed_user.confirmation_token
          end

          it "returns correct error", generate_swagger_example: true do
            expect(response_json["errors"][0]["title"]).to eq("Email was already confirmed, please try signing in")
            expect(session["warden.user.user.key"]).to be_nil
          end
        end

        context "expired token" do
          let(:confirmation_token) do
            travel_to 11.days.ago do
              unconfirmed_user.send_confirmation_instructions
            end
            unconfirmed_user.confirmation_token
          end

          it "returns correct error", generate_swagger_example: true do
            expect(response_json["errors"][0]["title"]).to eq("Email needs to be confirmed within 10 days, please request a new one")
          end
        end
      end
    end
  end
end
