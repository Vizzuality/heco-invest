require "rails_helper"

RSpec.describe "Backoffice http auth", type: :request do
  describe "GET #backoffice" do
    context "when no http auth credentials set" do
      it "returns correct html code" do
        with_environment("HTTP_AUTH_USERNAME" => "", "HTTP_AUTH_PASSWORD" => "") do
          get "/backoffice/sign_in"
          expect(response).to have_http_status(:ok)
        end
      end
    end

    context "when http auth credentials set" do
      let(:username) { "TEST" }
      let(:password) { "TEST" }

      it "returns error when credentials not provided" do
        with_environment("HTTP_AUTH_USERNAME" => username, "HTTP_AUTH_PASSWORD" => password) do
          get "/backoffice/sign_in", headers: {}
          expect(response).to have_http_status(:unauthorized)
        end
      end

      it "returns correct html code when credentials provided" do
        with_environment("HTTP_AUTH_USERNAME" => username, "HTTP_AUTH_PASSWORD" => password) do
          headers = {"HTTP_AUTHORIZATION" => ActionController::HttpAuthentication::Basic.encode_credentials(username, password)}
          get "/backoffice/sign_in", headers: headers
          expect(response).to have_http_status(:ok)
        end
      end
    end
  end
end
