require "rails_helper"

RSpec.describe "API V1 Projects", type: :request do
  before_all do
    @project = create(:project)
    create_list(:project, 6)
  end

  include_examples :api_pagination, model: Project, expected_total: 7

  describe "GET #index" do
    it "should return projects" do
      get "/api/v1/projects"

      expect(response).to have_http_status(:ok)
      expect(response.body).to match_snapshot("api/v1/projects")
    end

    describe "sparse fieldset" do
      it "should work" do
        get "/api/v1/projects?fields[project]=name,description,nonexisting"

        expect(response).to have_http_status(:ok)
        expect(response.body).to match_snapshot("api/v1/projects-sparse-fieldset")
      end
    end

    describe "include relationships" do
      it "should work" do
        get "/api/v1/projects?fields[project]=name,project_developer&include=project_developer"

        expect(response).to have_http_status(:ok)
        expect(response.body).to match_snapshot("api/v1/projects-include-relationships")
      end
    end
  end

  describe "GET #show" do
    it "should return single project" do
      get "/api/v1/projects/#{@project.id}"

      expect(response).to have_http_status(:ok)
      expect(response.body).to match_snapshot("api/v1/get-project")
    end

    it "should return project by slug" do
      get "/api/v1/projects/#{@project.slug}"

      expect(response).to have_http_status(:ok)
      expect(response.body).to match_snapshot("api/v1/get-project")
    end

    describe "errors" do
      it "displays not found error" do
        get "/api/v1/projects/not-found"

        expect(response).to have_http_status(:not_found)
        expect(response.body).to match_snapshot("api/v1/get-project-not-found")
      end
    end

    describe "sparse fieldset" do
      it "should work" do
        get "/api/v1/projects/#{@project.id}?fields[project]=name,description,nonexisting"

        expect(response).to have_http_status(:ok)
        expect(response.body).to match_snapshot("api/v1/get-project-sparse-fieldset")
      end
    end

    describe "include relationships" do
      it "should work" do
        get "/api/v1/projects/#{@project.id}?fields[project]=name,project_developer&include=project_developer"

        expect(response).to have_http_status(:ok)
        expect(response.body).to match_snapshot("api/v1/get-project-include-relationships")
      end
    end
  end
end
