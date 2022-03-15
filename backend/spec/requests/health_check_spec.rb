require "rails_helper"

RSpec.describe "Health Check", type: :request do
  describe "GET #health_check" do
    before { get "/health_check" }

    it "returns correct html code" do
      expect(response).to have_http_status(:no_content)
    end
  end
end
