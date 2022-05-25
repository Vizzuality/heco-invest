module Backoffice
  class ProjectDevelopersController < BaseController
    def index
      @project_developers = ProjectDeveloper.all
    end
  end
end
