module Backoffice
  class ProjectsController < BaseController
    def index
      @q = Project.ransack params[:q]
      @projects = API::Filterer.new(@q.result, {full_text: params.dig(:q, :filter_full_text)}).call
      @pagy_object, @projects = pagy @projects.includes(:priority_landscape, project_developer: [:account]), pagy_defaults
    end
  end
end
