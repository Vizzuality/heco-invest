module API
  module V1
    class ProjectDevelopersController < BaseController
      include API::Pagination

      before_action :fetch_project_developer, only: :show
      around_action(only: [:show]) { |_controller, action| set_locale(@project_developer&.account&.language, &action) }
      load_and_authorize_resource

      def index
        project_developers = @project_developers.includes(
          :projects, :involved_projects, account: [:owner, {picture_attachment: :blob}]
        )
        project_developers = API::Filterer.new(project_developers, filter_params.to_h).call
        project_developers = API::Sorter.new(project_developers, sorting_by: params[:sorting]).call
        pagy_object, project_developers = pagy(project_developers, page: current_page, items: per_page)
        render json: ProjectDeveloperSerializer.new(
          project_developers,
          include: included_relationships,
          fields: sparse_fieldset,
          links: pagination_links(:api_v1_project_developers_path, pagy_object),
          meta: pagination_meta(pagy_object),
          params: {current_user: current_user}
        ).serializable_hash
      end

      def show
        render json: ProjectDeveloperSerializer.new(
          @project_developer,
          include: included_relationships,
          fields: sparse_fieldset,
          params: {current_user: current_user}
        ).serializable_hash
      end

      private

      def fetch_project_developer
        return @project_developer = ProjectDeveloper.find(params[:id]) if fetching_by_uuid?

        account = Account.friendly.find(params[:id])
        @project_developer = ProjectDeveloper.find_by!(account_id: account.id)
      end

      def filter_params
        params.fetch(:filter, {}).permit :category, :impact, :full_text
      end
    end
  end
end
