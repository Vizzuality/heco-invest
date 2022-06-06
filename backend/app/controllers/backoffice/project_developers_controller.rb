module Backoffice
  class ProjectDevelopersController < BaseController
    def index
      @q = ProjectDeveloper.ransack params[:q]
      @project_developers = API::Filterer.new(@q.result, filter_params.to_h).call
      @pagy_object, @project_developers = pagy @project_developers.includes(account: [:owner]), pagy_defaults
    end

    private

    def filter_params
      params.fetch(:filter, {}).permit :full_text
    end
  end
end
