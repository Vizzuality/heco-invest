require "rails_helper"

RSpec.describe "Test Jobs Routes", type: :request, jobs_routes: true do
  describe "POST #jobs/test" do
    before { post "/jobs/test" }

    it "returns correct html code" do
      expect(response).to have_http_status(:success)
    end
  end
end
