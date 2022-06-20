require "swagger_helper"

RSpec.describe "Jobs User", type: :request do
  path "/jobs/users/purge" do
    post "Purge expired users" do
      tags "Jobs"

      let!(:fresh_user) { create :user, confirmed_at: nil, created_at: 1.day.ago }
      let!(:confirmed_user) { create :user, confirmed_at: Time.current, created_at: 2.months.ago }
      let!(:expired_used) { create :user, confirmed_at: nil, created_at: 2.months.ago }

      response "204", :success do
        run_test!

        it "deletes only correct users" do
          expect(User.order(:created_at).pluck(:id)).to eq([confirmed_user.id, fresh_user.id])
        end
      end
    end
  end
end
