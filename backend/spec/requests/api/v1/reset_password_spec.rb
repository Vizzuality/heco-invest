require "swagger_helper"

RSpec.describe "API V1 Reset Password", type: :request do
  let!(:user) { create(:user, email: "user@example.com", password: "SuperSecret1234") }

  path "/api/v1/reset_password" do
    post "Sends an email with reset password path and token" do
      tags "Reset Password"
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
        let(:params) { {email: "user@example.com"} }
        let("X-CSRF-TOKEN") { get_csrf_token }

        it "sends email" do |example|
          expect {
            submit_request example.metadata
            assert_response_matches_metadata example.metadata
          }.to have_enqueued_mail(DeviseMailer, :reset_password_instructions).with(user, String, fallback_language: :en)
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

        context "wrong params" do
          let(:params) { {} }

          run_test!

          it "returns 200" do
            expect(response).to have_http_status(:ok)
          end
        end
      end
    end

    put "Resets password" do
      tags "Reset Password"
      consumes "application/json"
      produces "application/json"
      security [csrf: []]
      parameter name: :params, in: :body, schema: {
        type: :object,
        properties: {
          password: {type: :string},
          password_confirmation: {type: :string},
          reset_password_token: {type: :string}
        },
        required: %w[email password_confirmation reset_password_token]
      }

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/user"}
        }
        let(:token) {
          user.send(:set_reset_password_token) # this is protected method
        }
        let(:params) { {password: "NewPassword1234", password_confirmation: "NewPassword1234", reset_password_token: token} }
        let("X-CSRF-TOKEN") { get_csrf_token }

        run_test!

        it "changes user password and signs in user", generate_swagger_example: true do
          user.reload
          expect(user.valid_password?("NewPassword1234")).to eq(true)
          expect(user.reset_password_token).to be_nil
          expect(user.reset_password_sent_at).to be_nil
        end
      end

      response "422", "Invalid, expired token" do
        let(:token) { "invalid" }
        let(:params) { {password: "NewPassword1234", password_confirmation: "NewPassword1234", reset_password_token: token} }
        let("X-CSRF-TOKEN") { get_csrf_token }

        run_test!

        it "returns correct error", generate_swagger_example: true do
          expect(response_json["errors"][0]["title"]).to eq("Reset password token is invalid")
        end

        context "no token" do
          let(:params) { {} }

          it "returns correct error" do
            expect(response_json["errors"][0]["title"]).to eq("Reset password token can't be blank")
          end
        end

        context "expired token" do
          let(:token) do
            travel_to 3.days.ago do
              user.send(:set_reset_password_token) # this is protected method
            end
          end
          let(:params) { {password: "NewPassword1234", password_confirmation: "NewPassword1234", reset_password_token: token} }

          it "returns correct error" do
            expect(response_json["errors"][0]["title"]).to eq("Reset password token has expired, please request a new one")
          end
        end

        context "invalid password" do
          let(:token) {
            user.send(:set_reset_password_token) # this is protected method
          }
          let(:params) { {password: "secret", password_confirmation: "secret", reset_password_token: token} }

          it "returns correct error" do
            expect(response_json["errors"].map { |e| e["title"] }).to include(
              "Password must be at least 12 characters long",
              "Password must include at least one lowercase letter, one uppercase letter, and one digit"
            )
          end
        end

        context "invalid password confirmation" do
          let(:token) {
            user.send(:set_reset_password_token) # this is protected method
          }
          let(:params) { {password: "NewPassword1234", password_confirmation: "WRONG", reset_password_token: token} }

          it "returns correct error" do
            expect(response_json["errors"][0]["title"]).to eq("Password confirmation doesn't match Password")
          end
        end
      end
    end
  end
end
