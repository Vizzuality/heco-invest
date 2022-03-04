require "rails_helper"

RSpec.describe "API V1 ProjectDevelopers", type: :request do
  before_all do
    @project_developer = create(:project_developer)
    create_list(:project_developer, 6)
  end

  include_examples :api_pagination, model: ProjectDeveloper, expected_total: 7

  describe "GET #index" do
    it "should return project_developers" do
      get "/api/v1/project_developers"

      expect(response).to have_http_status(:ok)
      expect(response.body).to match_snapshot("api/v1/project_developers")
    end
  end

  describe "GET #show" do
    it "should return single project_developer" do
      get "/api/v1/project_developers/#{@project_developer.id}"

      expect(response).to have_http_status(:ok)
      expect(response.body).to match_snapshot("api/v1/get-project-developer")
    end

    it "should return project_developer by account slug" do
      get "/api/v1/project_developers/#{@project_developer.account.slug}"

      expect(response).to have_http_status(:ok)
      expect(response.body).to match_snapshot("api/v1/get-project-developer")
    end

    describe "errors" do
      it "displays not found error" do
        get "/api/v1/project_developers/not-found"

        expect(response).to have_http_status(:not_found)
        expect(response.body).to match_snapshot("api/v1/get-project-developer-not-found")
      end
    end
  end
end
