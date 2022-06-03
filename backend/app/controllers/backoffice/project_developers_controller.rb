module Backoffice
  class ProjectDevelopersController < BaseController
    def index
      @q = ProjectDeveloper.ransack params[:q]
      @pagy_object, @project_developers = pagy @q.result.includes(account: [:owner])
    end
  end
end
