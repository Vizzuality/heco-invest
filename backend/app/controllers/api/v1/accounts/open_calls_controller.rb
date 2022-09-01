module API
  module V1
    module Accounts
      class OpenCallsController < BaseController
        include API::Pagination

        before_action :fetch_open_call, only: [:update, :destroy]
        around_action(only: %i[create update]) { |_, action| set_locale(language: current_user&.account&.language, &action) }
        load_and_authorize_resource

        def index
          open_calls = @open_calls.includes(picture_attachment: :blob, investor: :account)
          open_calls = open_calls.ransack(name_or_country_name_or_department_name_or_municipality_name_or_instrument_types_localized_or_status_localized_i_cont: filter_params[:full_text]).result if filter_params[:full_text].present?
          open_calls = open_calls.order(created_at: :desc)
          render json: OpenCallSerializer.new(
            open_calls,
            include: included_relationships,
            fields: sparse_fieldset,
            params: {current_user: current_user}
          ).serializable_hash
        end

        def create
          @open_call.save!
          render json: OpenCallSerializer.new(
            @open_call,
            include: included_relationships,
            params: {current_user: current_user}
          ).serializable_hash
        end

        def update
          @open_call.update! update_params
          render json: OpenCallSerializer.new(
            @open_call,
            include: included_relationships,
            params: {current_user: current_user}
          ).serializable_hash
        end

        def destroy
          ::OpenCalls::WithEmailNotification.new(@open_call).destroy!
          head :ok
        end

        def favourites
          @open_calls = @open_calls.includes(:investor).order(created_at: :desc)
          pagy_object, @open_calls = pagy(@open_calls, page: current_page, items: per_page)
          render json: OpenCallSerializer.new(
            @open_calls,
            include: included_relationships,
            fields: sparse_fieldset,
            links: pagination_links(:api_v1_open_calls_path, pagy_object),
            meta: pagination_meta(pagy_object),
            params: {current_user: current_user}
          ).serializable_hash
        end

        private

        def create_params
          update_params.merge(
            investor_id: current_user.account&.investor_id,
            language: current_user.account&.language
          )
        end

        def update_params
          params.permit(
            :picture,
            :name,
            :description,
            :country_id,
            :department_id,
            :municipality_id,
            :impact_description,
            :maximum_funding_per_project,
            :funding_priorities,
            :funding_exclusions,
            :closing_at,
            :status,
            sdgs: [],
            instrument_types: []
          )
        end

        def fetch_open_call
          @open_call = OpenCall.friendly.find(params[:id])
        end

        def filter_params
          params.fetch(:filter, {}).permit :full_text
        end
      end
    end
  end
end
