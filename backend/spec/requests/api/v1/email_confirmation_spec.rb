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

        it "sends email" do |example|
          expect {
            submit_request example.metadata
            assert_response_matches_metadata example.metadata
          }.to have_enqueued_mail(DeviseMailer, :confirmation_instructions).with(unconfirmed_user, String, fallback_language: :en)
        end

        context "invalid email" do
          let(:params) { {email: "invalid"} }

          run_test!

          it "returns 200" do
            expect(response).to have_http_status(:ok)
          end
        end

        context "non existing user" do
          let(:params) { {email: "valid@example.com"} }

          run_test!

          it "returns 200" do
            expect(response).to have_http_status(:ok)
          end
        end

        context "already confirmed" do
          let(:confirmed_user) { create(:user) }
          let(:params) { {email: confirmed_user.email} }

          it "returns 200, do not send email" do |example|
            expect {
              submit_request example.metadata
              assert_response_matches_metadata example.metadata
            }.not_to have_enqueued_mail(DeviseMailer, :confirmation_instructions)
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
        context "when confirmation token is invalid" do
          let(:confirmation_token) { "invalid_token" }

          run_test!

          it "returns correct error", generate_swagger_example: true do
            expect(response_json["errors"][0]["title"]).to eq("Confirmation token is invalid")
            expect(session["warden.user.user.key"]).to be_nil
            expect(unconfirmed_user.reload.confirmed?).to eq(false)
          end
        end

        context "already confirmed" do
          let(:confirmation_token) { unconfirmed_user.confirmation_token }

          before { unconfirmed_user.confirm }

          run_test!

          it "returns correct error" do
            expect(response_json["errors"][0]["title"]).to eq("Email was already confirmed, please try signing in")
            expect(session["warden.user.user.key"]).to be_nil
          end
        end

        context "expired token" do
          let(:confirmation_token) { unconfirmed_user.confirmation_token }

          before do
            travel_to 11.days.ago do
              unconfirmed_user.send_confirmation_instructions
            end
          end

          run_test!

          it "returns correct error" do
            expect(response_json["errors"][0]["title"]).to eq("Email needs to be confirmed within 10 days, please request a new one")
          end
        end
      end
    end
  end
end
