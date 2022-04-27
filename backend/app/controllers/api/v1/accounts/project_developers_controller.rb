module API
  module V1
    module Accounts
      class ProjectDevelopersController < BaseController
        skip_before_action :require_json!, only: %i[create update]
        before_action :require_project_developer!, except: :create

        def create
          current_user.with_lock do
            raise API::UnprocessableEntityError, I18n.t("errors.messages.user.multiple_accounts") if current_user.account_id.present?

            account = Account.create! account_params.merge(owner: current_user)
            current_user.update! account: account, role: :project_developer
            project_developer = ProjectDeveloper.create! project_developer_params.merge(account: account)
            render json: ProjectDeveloperSerializer.new(
              project_developer,
              params: {current_user: current_user}
            ).serializable_hash
          end
        end

        def update
          current_user.account.update! account_params.except(:language)
          current_user.account.project_developer.update! project_developer_params.except(:language)
          render json: ProjectDeveloperSerializer.new(
            current_user.account.project_developer,
            params: {current_user: current_user}
          ).serializable_hash
        end

        def show
          render json: ProjectDeveloperSerializer.new(
            current_user.account.project_developer,
            params: {current_user: current_user}
          ).serializable_hash
        end

        private

        def account_params
          params.fetch(:project_developer_params, params)
            .permit :language, :picture, :name, :website, :linkedin, :facebook, :twitter, :instagram, :about, :contact_email, :contact_phone
        end

        def project_developer_params
          params.fetch(:project_developer_params, params)
            .permit :language, :project_developer_type, :entity_legal_registration_number, :mission,
              categories: [], impacts: [], mosaics: []
        end
      end
    end
  end
end
