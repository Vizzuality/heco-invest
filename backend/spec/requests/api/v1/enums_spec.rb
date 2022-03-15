require "rails_helper"

RSpec.describe "API V1 Enums", type: :request do
  describe "GET #index" do
    it "should return enums" do
      get "/api/v1/enums"

      expect(response).to have_http_status(:ok)
      expect(response.body).to match_snapshot("api/v1/enums")
    end
  end
end
