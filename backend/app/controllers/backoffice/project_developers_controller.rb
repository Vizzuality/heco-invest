module Backoffice
  class ProjectDevelopersController < BaseController
    def index
      @project_developers = ProjectDeveloper.all.includes(account: [:owner])
    end
  end
end
