require "swagger_helper"

RSpec.describe "API V1 Invitation", type: :request do
  let(:account) { create :account }

  path "/api/v1/invitation" do
    post "Invites User" do
      tags "Invitation"
      consumes "application/json"
      produces "application/json"
      security [csrf: []]
      parameter name: :user_params, in: :body, schema: {
        type: :object,
        properties: {
          email: {type: :string}
        },
        required: ["email"]
      }

      let(:user_params) { {email: "user@example.com"} }

      it_behaves_like "with not authorized error", csrf: true
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user) }

      response "200", :success do
        let("X-CSRF-TOKEN") { get_csrf_token }

        before { sign_in account.owner }

        run_test!

        it "sends email" do
          mail = ActionMailer::Base.deliveries.last
          expect(mail.subject).to eq(I18n.t("devise.mailer.invitation_instructions.subject"))
          expect(mail.to.first).to eq("user@example.com")
        end

        context "when user already exists" do
          let(:user) { create :user }
          let(:user_params) { {email: user.email} }

          run_test!
        end
      end

      response "409", "User already have account" do
        let("X-CSRF-TOKEN") { get_csrf_token }
        let(:user_params) { {email: account.owner.email} }

        before { sign_in account.owner }

        run_test!
      end

      response "422", "Invalid email" do
        let("X-CSRF-TOKEN") { get_csrf_token }
        let(:user_params) { {email: "WRONG_EMAIL"} }

        before { sign_in account.owner }

        run_test!
      end
    end

    put "Accepts Invitation" do
      tags "Invitation"
      consumes "application/json"
      produces "application/json"
      security [csrf: []]
      parameter name: :user_params, in: :body, schema: {
        type: :object,
        properties: {
          invitation_token: {type: :string},
          password: {type: :string},
          first_name: {type: :string},
          last_name: {type: :string},
          ui_language: {type: :string}
        },
        required: ["invitation_token"]
      }

      let(:user) { create :user }
      let(:user_params) { {invitation_token: user.raw_invitation_token} }

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/user"}
        }

        let("X-CSRF-TOKEN") { get_csrf_token }

        before do
          user.invite! account.owner
        end

        run_test!

        context "when user record is just email" do
          let(:user) { User.new(email: "user@example.com").tap { |u| u.save(validate: false) } }
          let(:user_params) do
            {
              invitation_token: user.raw_invitation_token,
              first_name: "Jan",
              last_name: "Kowalski",
              password: "SuperSecret1234",
              ui_language: "en"
            }
          end

          it "matches snapshot", generate_swagger_example: true do
            expect(response.body).to match_snapshot("api/v1/invitation")
          end
        end
      end

      response "404", "Not Found" do
        let("X-CSRF-TOKEN") { get_csrf_token }
        let(:user_params) { {invitation_token: "WRONG_TOKEN"} }

        schema "$ref" => "#/components/schemas/errors"

        run_test!
      end

      response "409", "User already have account" do
        let("X-CSRF-TOKEN") { get_csrf_token }
        let(:new_account) { create :account }
        let(:user) { new_account.owner }

        before do
          user.invite! account.owner
        end

        run_test!
      end

      response "422", "Additional data needs to be provided" do
        let("X-CSRF-TOKEN") { get_csrf_token }
        let(:user) { User.new(email: "user@example.com").tap { |u| u.save(validate: false) } }

        before do
          user.invite! account.owner
        end

        run_test!
      end
    end
  end
end
