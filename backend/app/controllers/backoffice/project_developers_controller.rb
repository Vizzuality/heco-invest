module Backoffice
  class ProjectDevelopersController < BaseController
    def index
      @project_developers = ProjectDeveloper.all.includes(account: [:owner])
      @pagy_object, @project_developers = pagy @project_developers
    end
  end
end
