module Backoffice
  class ProjectsController < BaseController
    def index
      @q = Project.ransack params[:q]
      @projects = API::Filterer.new(@q.result, {full_text: params.dig(:q, :filter_full_text)}).call
      @projects = @projects.includes(:priority_landscape, project_developer: [:account])

      respond_to do |format|
        format.html do
          @pagy_object, @projects = pagy @projects, pagy_defaults
        end
        format.csv do
          send_data Backoffice::CSV::ProjectExporter.new(@projects).call,
            filename: "projects.csv",
            type: "text/csv; charset=utf-8"
        end
      end
    end
  end
end
