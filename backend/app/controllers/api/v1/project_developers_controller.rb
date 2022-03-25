module API
  module V1
    class ProjectDevelopersController < BaseController
      include API::Pagination

      def index
        project_developers = ProjectDeveloper.all.includes(:account)
        pagy_object, project_developers = pagy(project_developers, page: current_page, items: per_page)
        render json: ProjectDeveloperSerializer.new(
          project_developers,
          fields: sparse_fieldset,
          links: pagination_links(:api_v1_project_developers_path, pagy_object),
          meta: pagination_meta(pagy_object)
        ).serializable_hash
      end

      def show
        project_developer = fetch_project_developer

        render json: ProjectDeveloperSerializer.new(
          project_developer,
          fields: sparse_fieldset
        ).serializable_hash
      end

      private

      def fetch_project_developer
        return ProjectDeveloper.find(params[:id]) if fetching_by_uuid?

        account = Account.friendly.find(params[:id])
        ProjectDeveloper.find_by!(account_id: account.id)
      end
    end
  end
end
