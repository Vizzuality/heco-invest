module API
  module V1
    class ProjectsController < BaseController
      include API::Pagination

      before_action :fetch_project, only: [:show]

      def index
        projects = Project.all.includes(:project_developer, :involved_project_developers, project_images: {file_attachment: :blob})
        projects = API::Filterer.new(projects, filter_params.to_h).call
        pagy_object, projects = pagy(projects, page: current_page, items: per_page)
        render json: ProjectSerializer.new(
          projects,
          include: included_relationships,
          fields: sparse_fieldset,
          links: pagination_links(:api_v1_projects_path, pagy_object),
          meta: pagination_meta(pagy_object),
          params: {current_user: current_user}
        ).serializable_hash
      end

      def show
        render json: ProjectSerializer.new(
          @project,
          include: included_relationships,
          fields: sparse_fieldset,
          params: {current_user: current_user}
        ).serializable_hash
      end

      private

      def fetch_project
        @project = Project.friendly.find(params[:id])
      end

      def filter_params
        params.fetch(:filter, {}).permit :category, :sdg, :instrument_type, :ticket_size, :only_verified
      end
    end
  end
end
