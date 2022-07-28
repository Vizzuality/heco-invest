require "swagger_helper"

RSpec.describe "API V1 Invitation", type: :request do
  let(:account) { create :account, language: "pt" }
  let(:user) { create :user, ui_language: "es" }

  path "/api/v1/invitation/info" do
    post "Invited User information" do
      tags "Invitation"
      consumes "application/json"
      produces "application/json"
      security [csrf: []]
      parameter name: :invitation_params, in: :body, schema: {
        type: :object,
        properties: {
          invitation_token: {type: :string}
        },
        required: ["invitation_token"]
      }

      let(:invitation_params) { {invitation_token: user.raw_invitation_token} }

      response "200", :success do
        schema type: :object, properties: {
          email: {type: :string},
          account_name: {type: :string},
          requires_registration: {type: :boolean}
        },
          required: %w[email account_name requires_registration]

        let("X-CSRF-TOKEN") { get_csrf_token }

        before do
          user.invite! account.owner
        end

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/get-invitation")
        end

        context "when new user requires registration" do
          let(:user) { User.new email: "user@example.com" }

          it "has correct flag" do
            expect(response_json["requires_registration"]).to be_truthy
          end
        end
      end

      response "404", "User with provided invitation token was not found" do
        let("X-CSRF-TOKEN") { get_csrf_token }
        let(:invitation_params) { {invitation_token: "WRONG_TOKEN"} }

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
    end
  end

  path "/api/v1/invitation" do
    post "Invites Users" do
      tags "Invitation"
      consumes "application/json"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: :invitation_params, in: :body, schema: {
        type: :object,
        properties: {
          emails: {type: :array, items: {type: :string}}
        },
        required: ["emails"]
      }

      let(:invitation_params) { {emails: ["user@example.com", user.email, "WRONG_EMAIL", account.owner.email]} }

      it_behaves_like "with not authorized error", csrf: true
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user) }

      response "200", :success do
        let("X-CSRF-TOKEN") { get_csrf_token }

        before { sign_in account.owner }

        context "when users were not invited yet" do
          it "matches snapshot", generate_swagger_example: true do |example|
            submit_request example.metadata
            assert_response_matches_metadata example.metadata
            expect(response.body).to match_snapshot("api/v1/invitation-create")
          end

          it "sends emails" do |example|
            expect {
              submit_request example.metadata
            }.to have_enqueued_mail(DeviseMailer, :invitation_instructions).with(User, String, fallback_language: :pt).twice
          end

          it "sets unregistered user's ui_language to inviting account language" do |example|
            submit_request example.metadata
            expect(User.find_by_email("user@example.com").ui_language).to eq("pt")
          end
        end

        context "when user is already invited" do
          let(:invitation_params) { {emails: [user.email]} }

          before { user.invite! account.owner }

          it "re-invites user" do |example|
            submit_request example.metadata
            assert_response_matches_metadata example.metadata
            expect(response_json[user.email]).to eq(200)
          end

          it "sends emails" do |example|
            expect {
              submit_request example.metadata
            }.to have_enqueued_mail(DeviseMailer, :invitation_instructions).with(user, String, fallback_language: :pt)
          end
        end
      end
    end

    put "Accepts Invitation" do
      tags "Invitation"
      consumes "application/json"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: :invitation_params, in: :body, schema: {
        type: :object,
        properties: {
          invitation_token: {type: :string}
        },
        required: ["invitation_token"]
      }

      let(:invitation_params) { {invitation_token: user.raw_invitation_token} }

      it_behaves_like "with not authorized error", csrf: true

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/user"}
        }

        let("X-CSRF-TOKEN") { get_csrf_token }

        before do
          user.invite! account.owner
          sign_in user
        end

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/invitation-accepted")
        end
      end

      response "403", "Invited user and logged user are different" do
        let("X-CSRF-TOKEN") { get_csrf_token }

        schema "$ref" => "#/components/schemas/errors"

        before do
          user.invite! account.owner
          sign_in create(:user)
        end

        run_test!
      end

      response "404", "User with provided invitation token was not found" do
        let("X-CSRF-TOKEN") { get_csrf_token }
        let(:invitation_params) { {invitation_token: "WRONG_TOKEN"} }

        schema "$ref" => "#/components/schemas/errors"

        before do
          sign_in user
        end

        run_test!
      end

      response "409", "User already have account" do
        let("X-CSRF-TOKEN") { get_csrf_token }
        let(:new_account) { create :account }
        let(:user) { new_account.owner }

        before do
          user.invite! account.owner
          sign_in user
        end

        run_test!
      end
    end
  end
end
