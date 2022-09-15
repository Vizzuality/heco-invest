require "swagger_helper"

RSpec.describe "API V1 Account Users", type: :request do
  path "/api/v1/account/users" do
    get "Get current account users" do
      tags "Users"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: "filter[full_text]", in: :query, type: :string, required: false, description: "Filter records by provided text."

      let(:account) { create :account }
      let!(:account_user) { create :user, account: account, invitation_accepted_at: Time.current }
      let!(:invited_user) { create :user, invited_by: account.owner, invitation_sent_at: Time.current, invitation_token: "TOKEN" }
      let!(:ignored_user) { create :user }
      let!(:user_from_different_account) { create :user, account: create(:account) }

      it_behaves_like "with not authorized error", csrf: true

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/user"}}
        }
        let("X-CSRF-TOKEN") { get_csrf_token }

        before(:each) do
          sign_in account.owner
        end

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/accounts-users")
        end

        context "when filtered by searched text" do
          let("filter[full_text]") { account_user.first_name }

          it "contains only correct records" do
            expect(response_json["data"].pluck("id")).to eq([account_user.id])
          end
        end
      end
    end
  end

  path "/api/v1/account/users/{user_id}" do
    delete "Deletes user" do
      tags "Users"
      consumes "application/json"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: :user_id, in: :path, type: :string
      parameter name: :empty, in: :body, schema: {type: :object}, required: false

      let(:account) { create(:account, :approved) }
      let(:account_owner) do
        owner = create(:user, account_id: account.id)
        account.update_columns(owner_id: owner.id)
        owner
      end
      let(:account_user) { create(:user, account_id: account.id) }
      let(:other_account_user) { create(:user, account: create(:account, :approved)) }
      let(:user_id) { account_user.id }

      it_behaves_like "with not authorized error", csrf: true

      response "403", :forbidden do
        let("X-CSRF-TOKEN") { get_csrf_token }
        schema "$ref" => "#/components/schemas/errors"

        context "User account not approved" do
          before { sign_in create(:user, account: create(:account, :unapproved)) }

          run_test!
        end

        context "User is account owner, deleting self" do
          let(:user_id) { account_owner.id }
          before { sign_in account_owner }

          run_test!
        end

        context "User is account user, deleting account owner" do
          let(:user_id) { account_owner.id }
          before { sign_in account_user }

          run_test!
        end

        context "User is other account user, deleting account owner" do
          let(:user_id) { account_owner.id }
          before { sign_in other_account_user }

          run_test!
        end

        context "User is account owner, deleting other account user" do
          let(:user_id) { other_account_user.id }
          before { sign_in account_owner }

          run_test!
        end

        context "User is account user, deleting other account user" do
          let(:user_id) { other_account_user.id }
          before { sign_in account_user }

          run_test!
        end
      end

      response "200", :success do
        let("X-CSRF-TOKEN") { get_csrf_token }

        context "User is account owner and deleted user is in their account" do
          let(:user_id) { account_user.id }
          before do
            sign_in account_owner
          end

          it "user is deleted" do |example|
            submit_request example.metadata
            assert_response_matches_metadata example.metadata
            expect { account_user.reload }.to raise_error(ActiveRecord::RecordNotFound)
          end

          it "send email" do |example|
            expect {
              submit_request example.metadata
            }.to have_enqueued_mail(UserMailer, :destroyed).with(account_user.email, account_user.full_name, account_user.account_language)
          end
        end

        context "User is deleting themselves" do
          let(:user_id) { account_user.id }
          before do
            sign_in account_user
          end

          it "user is deleted" do |example|
            submit_request example.metadata
            assert_response_matches_metadata example.metadata
            expect { account_user.reload }.to raise_error(ActiveRecord::RecordNotFound)
          end

          it "send email" do |example|
            expect {
              submit_request example.metadata
            }.to have_enqueued_mail(UserMailer, :destroyed).with(account_user.email, account_user.full_name, account_user.account_language)
          end
        end

        context "when owner deletes user which he invited" do
          let(:user_without_account) { create :user }
          let(:user_id) { user_without_account.id }

          before do
            user_without_account.invite! account_owner
            sign_in account_owner
          end

          it "user is deleted" do |example|
            submit_request example.metadata
            assert_response_matches_metadata example.metadata
            expect { user_without_account.reload }.to raise_error(ActiveRecord::RecordNotFound)
          end

          it "send email" do |example|
            expect {
              submit_request example.metadata
            }.to have_enqueued_mail(UserMailer, :destroyed).with(user_without_account.email, user_without_account.full_name, user_without_account.ui_language)
          end
        end
      end
    end
  end

  path "/api/v1/account/users/transfer_ownership" do
    post "Transfers ownership of current user to different user from same account" do
      tags "Users"
      consumes "application/json"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: :user_id, in: :query, type: :string, description: "Id of user from same account", required: true

      let(:account) { create :account, :approved }
      let(:user) { create :user, account: account }
      let(:user_with_different_account) { create :user, account: create(:account, :approved) }
      let(:user_id) { user.id }

      it_behaves_like "with not authorized error", csrf: true
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user) }

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/user"}
        }
        let("X-CSRF-TOKEN") { get_csrf_token }

        before do
          sign_in account.owner
        end

        it "returns success response" do |example|
          submit_request example.metadata
          assert_response_matches_metadata example.metadata
        end

        it "matches snapshot", generate_swagger_example: true do |example|
          submit_request example.metadata
          expect(response.body).to match_snapshot("api/v1/accounts-transfer-ownership")
        end

        it "sends email" do |example|
          expect {
            submit_request example.metadata
          }.to have_enqueued_mail(UserMailer, :ownership_transferred).with(user)
        end
      end

      response "404", "User not found at owner account", generate_swagger_example: true do
        schema "$ref" => "#/components/schemas/errors"
        let("X-CSRF-TOKEN") { get_csrf_token }
        let(:user_id) { user_with_different_account.id }

        before do
          sign_in account.owner
        end

        run_test!
      end
    end
  end

  path "/api/v1/account/users/favourites" do
    delete "Delete all user favourites" do
      tags "Users"
      consumes "application/json"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: :empty, in: :body, schema: {type: :object}, required: false

      let(:account) { create :account, :approved }
      let(:user) { account.owner }
      let!(:favourite_project) { create :favourite_project, user: user }
      let!(:favourite_project_developer) { create :favourite_project_developer, user: user }
      let!(:favourite_investor) { create :favourite_investor, user: user }
      let!(:favourite_open_call) { create :favourite_open_call, user: user }

      it_behaves_like "with not authorized error", csrf: true
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user) }

      response "200", :success do
        let("X-CSRF-TOKEN") { get_csrf_token }

        before do
          sign_in user
        end

        run_test!

        it "deletes all favourites" do
          expect(user.favourite_projects.count).to be_zero
          expect(user.favourite_project_developers.count).to be_zero
          expect(user.favourite_investors.count).to be_zero
          expect(user.favourite_open_calls.count).to be_zero
        end
      end
    end
  end

  path "/api/v1/account/users/account" do
    delete "Deletes current user account" do
      tags "Users"
      consumes "application/json"
      produces "application/json"
      security [csrf: [], cookie_auth: []]
      parameter name: :empty, in: :body, schema: {type: :object}, required: false

      it_behaves_like "with not authorized error", csrf: true
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user) }
      it_behaves_like "with forbidden error", csrf: true, user: -> { create(:user_investor) }

      response "200", :success do
        let("X-CSRF-TOKEN") { get_csrf_token }

        context "when user is signed as investor" do
          let(:user) { create :user_investor }
          let(:open_call) { create :open_call, investor: user.account.investor }
          let!(:open_call_application) { create :open_call_application, open_call: open_call }

          before do
            sign_in user.account.owner
          end

          it "returns success response" do |example|
            submit_request example.metadata
            assert_response_matches_metadata example.metadata
          end

          it "sends emails" do |example|
            expect {
              submit_request example.metadata
              expect(OpenCall.where(investor: user.account.investor)).not_to be_exist
            }.to have_enqueued_mail(ProjectDeveloperMailer, :open_call_destroyed)
              .with(open_call_application.project_developer, open_call_application.project, open_call.name)
          end
        end

        context "when user is signed as project developer" do
          let(:user) { create :user_project_developer }
          let(:project) { create :project, project_developer: user.account.project_developer }
          let!(:open_call_application) { create :open_call_application, project: project }

          before do
            sign_in user.account.owner
          end

          it "returns success response" do |example|
            submit_request example.metadata
            assert_response_matches_metadata example.metadata
          end

          it "sends emails" do |example|
            expect {
              submit_request example.metadata
              expect(Project.where(project_developer: user.account.project_developer)).not_to be_exist
            }.to have_enqueued_mail(InvestorMailer, :project_destroyed)
              .with(open_call_application.investor, project.name, open_call_application.open_call)
          end
        end
      end
    end
  end
end
