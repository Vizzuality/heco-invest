module API
  module V1
    class ProjectDevelopersController < BaseController
      include API::Pagination

      skip_before_action :require_json!, only: :create
      before_action :authenticate_user!, only: :create

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

      def create
        current_user.with_lock do
          raise API::UnprocessableEntityError, I18n.t("errors.messages.user_multiple_accounts") if current_user.account_id.present?

          account = Account.create! account_params
          current_user.update! account: account, role: :project_developer
          project_developer = ProjectDeveloper.create! project_developer_params.merge account: account
          render json: ProjectDeveloperSerializer.new(project_developer).serializable_hash
        end
      end

      private

      def fetch_project_developer
        return ProjectDeveloper.find(params[:id]) if fetching_by_uuid?

        account = Account.friendly.find(params[:id])
        ProjectDeveloper.find_by!(account_id: account.id)
      end

      def account_params
        params.fetch(:project_developer_params, params)
          .permit :language, :picture, :name, :website, :linkedin, :facebook, :twitter, :instagram, :about
      end

      def project_developer_params
        params.fetch(:project_developer_params, params)
          .permit :language, :project_developer_type, :entity_legal_registration_number, :mission,
            categories: [], impacts: [], location_ids: []
      end
    end
  end
end
