module Backoffice
  class ProjectsController < BaseController
    def index
      @q = Project.ransack params[:q]
      @projects = @q.result.includes(:priority_landscape, project_developer: [:account])
      @pagy_object, @projects = pagy @projects, pagy_defaults
    end
  end
end
