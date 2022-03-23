require "swagger_helper"

RSpec.describe "API V1 Session", type: :request do
  before_all do
    @user = create(:user, email: "user@example.com", password: "SuperSecret1234")
  end

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
          passsword: {type: :string}
        },
        required: ["email", "password"]
      }

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/user"}
        }
        let(:user_params) do
          {
            email: "user@example.com",
            password: "SuperSecret1234"
          }
        end
        let("X-CSRF-TOKEN") { get_csrf_token }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/session")
          expect(session["warden.user.user.key"]).to be_present
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

        let(:user_params) do
          {
            email: "user2@example.com",
            password: "SuperSecret1234"
          }
        end
        let("X-CSRF-TOKEN") { get_csrf_token }

        run_test!

        it "returns correct error", generate_swagger_example: true do
          expect(response_json["errors"][0]["title"]).to eq("Invalid email or password.")
        end
      end
    end

    delete "Logs out User" do
      tags "Session"
      security [cookie_auth: [], csrf: []]
      consumes "application/json"
      produces "application/json"

      it_behaves_like "with not authorized error", csrf: true

      response "200", :success do
        let("X-CSRF-TOKEN") { get_csrf_token }

        before(:each) { sign_in @user }

        run_test!

        it "removes user from session" do
          expect(session["warden.user.user.key"]).to be_nil
        end
      end
    end
  end
end
