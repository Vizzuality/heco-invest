module API
  module V1
    module Accounts
      class ProjectDevelopersController < BaseController
        before_action :require_project_developer!, except: :create
        around_action(only: [:show]) { |_controller, action| set_locale(current_user&.account&.language, &action) }

        def create
          current_user.with_lock do
            raise API::UnprocessableEntityError, I18n.t("errors.messages.user.multiple_accounts") if current_user.account_id.present?

            account = Account.create! account_params.merge(owner: current_user, users: [current_user])
            current_user.update! role: :project_developer
            project_developer = ProjectDeveloper.create! project_developer_params.merge(account: account)
            render json: ProjectDeveloperSerializer.new(
              project_developer,
              params: {current_user: current_user}
            ).serializable_hash
          end
        end

        def update
          current_user.with_lock do
            current_user.account.update! account_params.except(:language)
            current_user.account.project_developer.update! project_developer_params.except(:language)
            render json: ProjectDeveloperSerializer.new(
              current_user.account.project_developer,
              params: {current_user: current_user}
            ).serializable_hash
          end
        end

        def show
          render json: ProjectDeveloperSerializer.new(
            current_user.account.project_developer,
            include: included_relationships,
            params: {current_user: current_user}
          ).serializable_hash
        end

        private

        def account_params
          params.permit :language, :picture, :name, :website, :linkedin, :facebook, :twitter, :instagram, :about,
            :contact_email, :contact_phone
        end

        def project_developer_params
          params.permit :project_developer_type, :entity_legal_registration_number, :mission,
            categories: [], impacts: [], mosaics: []
        end
      end
    end
  end
end
