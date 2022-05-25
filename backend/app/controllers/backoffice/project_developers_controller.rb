module Backoffice
  class ProjectDevelopersController < BaseController
    before_action :fetch_project_developer, only: [:approve, :reject]

    def index
      @project_developers = ProjectDeveloper.all
    end

    def approve
      @project_developer.account.approved!
      redirect_back(fallback_location: admin_root_path)
    end

    def reject
      @project_developer.account.rejected!
      redirect_back(fallback_location: admin_root_path)
    end

    private

    def fetch_project_developer
      @project_developer = ProjectDeveloper.find(params[:id])
    end
  end
end
