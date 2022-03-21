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
      parameter name: :user_params, in: :body, type: :object,
        properties: {
          email: {type: :string},
          passsword: {type: :string}
        },
        required: ["email", "password"]
      parameter name: "X-CSRF-TOKEN", in: :header, type: :string, description: "CSRF token"

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
          expect(response_json["errors"][0]["title"]).to eq("Invalid email or password")
        end
      end
    end

    delete "Logs out User" do
      tags "Session"
      consumes "application/json"
      produces "application/json"
      parameter name: "X-CSRF-TOKEN", in: :header, type: :string, description: "CSRF token"

      response "200", :success do
        schema type: :object, properties: {data: {}}
        let("X-CSRF-TOKEN") { get_csrf_token }

        before(:each) { sign_in @user }

        run_test!
      end

      response "401", "Authentication failed" do
        schema type: :object, properties: {data: {}}
        let("X-CSRF-TOKEN") { get_csrf_token }

        run_test!

        it "returns correct error", generate_swagger_example: true do
          expect(response_json["errors"][0]["title"]).to eq("You need to sign in before making this request")
        end
      end
    end
  end
end
