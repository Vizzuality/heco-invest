module API
  module V1
    module Accounts
      class ProjectDevelopersController < BaseController
        skip_before_action :require_json!, only: :create
        before_action :authenticate_user!

        def create
          current_user.with_lock do
            raise API::UnprocessableEntityError, I18n.t("errors.messages.user_multiple_accounts") if current_user.account_id.present?

            account = Account.create! account_params.merge(owner: current_user)
            current_user.update! account: account, role: :project_developer
            project_developer = ProjectDeveloper.create! project_developer_params.merge(account: account)
            render json: ProjectDeveloperSerializer.new(project_developer).serializable_hash
          end
        end

        private

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
end
