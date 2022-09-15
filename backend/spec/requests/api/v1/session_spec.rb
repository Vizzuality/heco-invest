require "swagger_helper"

RSpec.describe "API V1 Session", type: :request do
  let!(:user) { create(:user, email: "user@example.com", password: "SuperSecret1234") }

  path "/api/v1/session" do
    post "Creates User Session/Logs In" do
      tags "Session"
      consumes "application/json"
      produces "application/json"
      security [csrf: []]
      parameter name: :user_params, in: :body, schema: {
        type: :object,
        properties: {
          email: {type: :string},
          password: {type: :string}
        },
        required: ["email", "password"]
      }

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/user"}
        }
        let("X-CSRF-TOKEN") { get_csrf_token }

        context "when user does not require 2FA OTP attempt" do
          let(:user_params) do
            {
              email: "user@example.com",
              password: "SuperSecret1234"
            }
          end
          before { user.update! otp_required_for_login: false }

          context "when non-invited user tries to login" do
            run_test!

            it "matches snapshot", generate_swagger_example: true do
              expect(response.body).to match_snapshot("api/v1/session")
              expect(session["warden.user.user.key"]).to be_present
            end
          end

          context "when invited user tries to login" do
            before do
              user.invite! create(:account).owner
            end

            run_test!

            it "can still login" do
              expect(session["warden.user.user.key"]).to be_present
            end
          end
        end

        context "when user requires 2FA OTP attempt" do
          let(:user_params) do
            {
              email: "user@example.com",
              password: "SuperSecret1234",
              otp_attempt: user.current_otp
            }
          end

          before do
            user.update! otp_required_for_login: true, otp_secret: User.generate_otp_secret(6)
          end

          run_test!

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/session")
            expect(session["warden.user.user.key"]).to be_present
          end
        end
      end

      response "401", "Authentication failed - not confirmed user" do
        before(:each) { create(:user, :unconfirmed, email: "unconfirmed@example.com", password: "SuperSecret1234") }

        let("X-CSRF-TOKEN") { get_csrf_token }
        let(:user_params) do
          {
            email: "unconfirmed@example.com",
            password: "SuperSecret1234"
          }
        end

        run_test!

        it "returns correct error", generate_swagger_example: true do
          expect(response_json["errors"][0]["title"]).to eq("You have to confirm your email address before continuing.")
          expect(response_json["errors"][0]["code"]).to eq("unconfirmed")
        end
      end

      response "422", "Invalid credentials" do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/user"}
        }
        let("X-CSRF-TOKEN") { get_csrf_token }

        context "when credentials are invalid" do
          let(:user_params) do
            {
              email: "user2@example.com",
              password: "SuperSecret1234"
            }
          end

          run_test!

          it "returns correct error", generate_swagger_example: true do
            expect(response_json["errors"][0]["title"]).to eq("Invalid email or password.")
          end
        end

        context "when credentials are valid but 2FA is invalid" do
          let(:user_params) do
            {
              email: "user@example.com",
              password: "SuperSecret1234",
              otp_attempt: "WRONG_CODE"
            }
          end

          before do
            user.update! otp_required_for_login: true, otp_secret: User.generate_otp_secret(6)
          end

          run_test!

          it "returns correct error" do
            expect(response_json["errors"][0]["title"]).to eq("Invalid email or password.")
          end
        end
      end
    end

    delete "Logs out User" do
      tags "Session"
      security [cookie_auth: [], csrf: []]
      consumes "application/json"
      produces "application/json"
      parameter name: :empty, in: :body, schema: {type: :object}, required: false

      it_behaves_like "with not authorized error", csrf: true

      response "200", :success do
        let("X-CSRF-TOKEN") { get_csrf_token }
        let!(:token) { user.token }

        before(:each) { sign_in user }

        run_test!

        it "removes user from session" do
          expect(session["warden.user.user.key"]).to be_nil
          expect(user.reload.token).not_to eq(token)
        end
      end
    end
  end

  path "/api/v1/session/two_factor_auth" do
    post "Checks if User requires 2FA and send 2FA code" do
      tags "Session"
      consumes "application/json"
      produces "application/json"
      security [csrf: []]
      parameter name: :user_params, in: :body, schema: {
        type: :object,
        properties: {
          email: {type: :string},
          password: {type: :string}
        },
        required: ["email", "password"]
      }

      response "200", :success do
        schema type: :object, properties: {data: {type: :boolean}, required: ["data"]}
        let("X-CSRF-TOKEN") { get_csrf_token }

        context "when credentials are correct" do
          let(:user_params) do
            {
              email: "user@example.com",
              password: "SuperSecret1234"
            }
          end

          context "when user has 2FA turned on" do
            before { user.update! otp_required_for_login: true }

            run_test!

            it "sends email with OTP code", generate_swagger_example: true do |example|
              expect {
                submit_request example.metadata
                expect(response_json["data"]).to be_truthy
              }.to have_enqueued_mail(UserMailer, :send_otp_code).with(user)
            end
          end

          context "when user have 2FA turned off" do
            before { user.update! otp_required_for_login: false }

            run_test!

            it "does not send email with OTP code" do |example|
              expect {
                submit_request example.metadata
                expect(response_json["data"]).to be_falsey
              }.not_to have_enqueued_mail(UserMailer, :send_otp_code)
            end
          end
        end

        context "when credentials are wrong" do
          let(:user_params) do
            {
              email: "user@example.com",
              password: "WRONG_PASSWORD"
            }
          end

          run_test!

          it "is false" do
            expect(response_json["data"]).to be_falsey
          end
        end
      end
    end
  end
end
