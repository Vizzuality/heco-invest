require "rails_helper"

RSpec.describe "API V1 Open Calls", type: :request do
  before_all do
    @open_call = create(:open_call)
    create_list(:open_call, 6)
  end

  include_examples :api_pagination, model: OpenCall, expected_total: 7

  describe "GET #index" do
    it "should return open_calls" do
      get "/api/v1/open_calls"

      expect(response).to have_http_status(:ok)
      expect(response.body).to match_snapshot("api/v1/open_calls", dynamic_attributes: %w[closing_at])
    end

    describe "sparse fieldset" do
      it "should work" do
        get "/api/v1/open_calls?fields[open_call]=name,description,nonexisting"

        expect(response).to have_http_status(:ok)
        expect(response.body).to match_snapshot("api/v1/open-calls-sparse-fieldset")
      end
    end
  end

  describe "GET #show" do
    it "should return single open_call" do
      get "/api/v1/open_calls/#{@open_call.id}"

      expect(response).to have_http_status(:ok)
      expect(response.body).to match_snapshot("api/v1/get-open_call", dynamic_attributes: %w[closing_at])
    end

    it "should return open_call by slug" do
      get "/api/v1/open_calls/#{@open_call.slug}"

      expect(response).to have_http_status(:ok)
      expect(response.body).to match_snapshot("api/v1/get-open_call", dynamic_attributes: %w[closing_at])
    end

    describe "errors" do
      it "displays not found error" do
        get "/api/v1/open_calls/not-found"

        expect(response).to have_http_status(:not_found)
        expect(response.body).to match_snapshot("api/v1/get-open_call-not-found")
      end
    end

    describe "sparse fieldset" do
      it "should work" do
        get "/api/v1/open_calls/#{@open_call.id}?fields[open_call]=name,description,nonexisting"

        expect(response).to have_http_status(:ok)
        expect(response.body).to match_snapshot("api/v1/get-open-call-sparse-fieldset")
      end
    end
  end
end
