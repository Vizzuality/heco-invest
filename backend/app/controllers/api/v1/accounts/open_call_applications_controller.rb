module API
  module V1
    module Accounts
      class OpenCallApplicationsController < BaseController
        around_action(only: %i[create update]) { |_, action| set_locale(language: current_user&.account&.language, &action) }
        load_and_authorize_resource

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

        def update_params
          params.permit :message
        end
      end
    end
  end
end
