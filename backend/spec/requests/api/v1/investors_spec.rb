require "rails_helper"

RSpec.describe "API V1 Investors", type: :request do
  before_all do
    @investor = create(:investor)
    create_list(:investor, 6)
  end

  include_examples :api_pagination, model: Investor, expected_total: 7

  describe "GET #index" do
    it "should return investors" do
      get "/api/v1/investors"

      expect(response).to have_http_status(:ok)
      expect(response.body).to match_snapshot("api/v1/investors")
    end

    describe "sparse fieldset" do
      it "should work" do
        get "/api/v1/investors?fields[investor]=instagram,facebook,nonexisting"

        expect(response).to have_http_status(:ok)
        expect(response.body).to match_snapshot("api/v1/investors-sparse-fieldset")
      end
    end
  end

  describe "GET #show" do
    it "should return single investor" do
      get "/api/v1/investors/#{@investor.id}"

      expect(response).to have_http_status(:ok)
      expect(response.body).to match_snapshot("api/v1/get-investor")
    end

    it "should return investor by account slug" do
      get "/api/v1/investors/#{@investor.account.slug}"

      expect(response).to have_http_status(:ok)
      expect(response.body).to match_snapshot("api/v1/get-investor")
    end

    describe "errors" do
      it "displays not found error" do
        get "/api/v1/investors/not-found"

        expect(response).to have_http_status(:not_found)
        expect(response.body).to match_snapshot("api/v1/get-investor-not-found")
      end
    end

    describe "sparse fieldset" do
      it "should work" do
        get "/api/v1/investors/#{@investor.id}?fields[investor]=instagram,facebook,nonexisting"

        expect(response).to have_http_status(:ok)
        expect(response.body).to match_snapshot("api/v1/get-investor-sparse-fieldset")
      end
    end
  end
end
