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
            }.to have_enqueued_mail(UserMailer, :destroyed).with(account_user.email, account_user.full_name)
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
            }.to have_enqueued_mail(UserMailer, :destroyed).with(account_user.email, account_user.full_name)
          end
        end
      end
    end
  end
end
