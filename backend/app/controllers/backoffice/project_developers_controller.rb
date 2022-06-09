module Backoffice
  class ProjectDevelopersController < BaseController
    def index
      @q = ProjectDeveloper.ransack params[:q]
      @project_developers = API::Filterer.new(@q.result, {full_text: params.dig(:q, :filter_full_text)}).call
      @pagy_object, @project_developers = pagy @project_developers.includes(account: [:owner]), pagy_defaults
    end
  end
end
