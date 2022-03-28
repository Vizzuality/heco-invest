require "swagger_helper"

RSpec.describe "API V1 User", type: :request do
  before_all do
    @user = create(:user, email: "user@example.com", password: "SuperSecret1234")
  end

  path "/api/v1/user" do
    post "Creates/Registers user" do
      tags "User"
      consumes "application/json"
      produces "application/json"
      security [csrf: []]
      parameter name: :user_params, in: :body, schema: {
        type: :object,
        properties: {
          first_name: {type: :string},
          last_name: {type: :string},
          email: {type: :string},
          password: {type: :string},
          ui_language: {type: :string}
        },
        required: ["first_name", "last_name", "email", "password"]
      }

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/user"}
        }
        let(:user_params) do
          {
            first_name: "Jan",
            last_name: "Kowalski",
            email: "jankowalski@example.com",
            password: "SuperSecret1234",
            ui_language: "en"
          }
        end
        let("X-CSRF-TOKEN") { get_csrf_token }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/user-create")
        end

        it "sends confirmation email" do
          mail = ActionMailer::Base.deliveries.last
          expect(mail.subject).to eq("Confirmation instructions")
          expect(mail.to.first).to eq("jankowalski@example.com")
        end
      end

      response "422", "Invalid form" do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/user"}
        }

        let(:user_params) do
          {
            last_name: "Kowalski",
            email: "jankowalski@example.com",
            password: "secret"
          }
        end
        let("X-CSRF-TOKEN") { get_csrf_token }

        run_test!

        it "returns correct error", generate_swagger_example: true do
          expect(response_json["errors"].map { |e| e["title"] }).to include(
            "Password must be at least 12 characters long",
            "Password must include at least one lowercase letter, one uppercase letter, and one digit",
            "First name can't be blank"
          )
        end
      end
    end

    get "Returns logged in user" do
      tags "User"
      produces "application/json"
      security [cookie_auth: []]

      it_behaves_like "with not authorized error", csrf: false

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/user"}
        }

        before(:each) { sign_in @user }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/user")
        end
      end
    end
  end
end
