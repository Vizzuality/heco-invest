module API
  module V1
    module Accounts
      class OpenCallApplicationsController < BaseController
        around_action(only: %i[create update]) { |_, action| set_locale(language: current_user&.account&.language, &action) }
        load_and_authorize_resource

        def index
          @open_call_applications = @open_call_applications.includes(open_call: {investor: :account}, project: {project_developer: :account})
          @open_call_applications = @open_call_applications.where project_id: filter_params[:project_id] if filter_params[:project_id].present?
          @open_call_applications = @open_call_applications.where open_call_id: filter_params[:open_call_id] if filter_params[:open_call_id].present?
          @open_call_applications = search_by filter_params[:full_text], @open_call_applications if filter_params[:full_text].present?
          @open_call_applications = @open_call_applications.order(created_at: :desc)
          render json: OpenCallApplicationSerializer.new(
            @open_call_applications,
            include: included_relationships,
            fields: sparse_fieldset,
            params: {current_user: current_user}
          ).serializable_hash
        end

        def show
          render json: OpenCallApplicationSerializer.new(
            @open_call_application,
            include: included_relationships,
            fields: sparse_fieldset,
            params: {current_user: current_user}
          ).serializable_hash
        end

        def create
          @open_call_application.save!
          render json: OpenCallApplicationSerializer.new(
            @open_call_application,
            include: included_relationships,
            params: {current_user: current_user}
          ).serializable_hash
        end

        def update
          @open_call_application.update! update_params
          render json: OpenCallApplicationSerializer.new(
            @open_call_application,
            include: included_relationships,
            params: {current_user: current_user}
          ).serializable_hash
        end

        def destroy
          @open_call_application.destroy!
          head :ok
        end

        def funding
          @open_call_application.update! funded: true
          head :ok
        end

        def not_funding
          @open_call_application.update! funded: false
          head :ok
        end

        private

        def create_params
          params.permit(
            :open_call_id,
            :project_id,
            :message
          ).merge(
            language: current_user.account&.language
          )
        end

        def search_by(text, query)
          return query.ransack(open_call_name_or_project_name_or_open_call_investor_account_name_i_cont: text).result if current_user.project_developer?

          query.ransack(project_name_or_project_project_developer_account_name_i_cont: text).result
        end

        def update_params
          params.permit :message
        end

        def filter_params
          params.fetch(:filter, {}).permit :project_id, :open_call_id, :full_text
        end
      end
    end
  end
end
