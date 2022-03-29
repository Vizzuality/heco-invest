module API
  module V1
    module Accounts
      class ProjectDevelopersController < BaseController
        skip_before_action :require_json!, only: %i[create update]

        def create
          current_user.with_lock do
            raise API::UnprocessableEntityError, I18n.t("errors.messages.user.multiple_accounts") if current_user.account_id.present?

            account = Account.create! account_params.merge(owner: current_user)
            current_user.update! account: account, role: :project_developer
            project_developer = ProjectDeveloper.create! project_developer_params.merge(account: account)
            render json: ProjectDeveloperSerializer.new(project_developer).serializable_hash
          end
        end

        def update
          if current_user.role.to_sym != :project_developer
            raise API::UnprocessableEntityError, I18n.t("errors.messages.user.no_project_developer")
          end

          current_user.account.update! account_params.except(:language)
          current_user.account.project_developer.update! project_developer_params.except(:language)
          render json: ProjectDeveloperSerializer.new(current_user.account.project_developer).serializable_hash
        end

        private

        def account_params
          data = params.fetch(:project_developer_params, params)
            .permit :language, :picture, :name, :website, :linkedin, :facebook, :twitter, :instagram, :about
          data = data.except(:picture) if data[:picture].blank?
          data
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
