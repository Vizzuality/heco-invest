module API
  module V1
    module Accounts
      class OpenCallsController < BaseController
        include API::Pagination

        load_and_authorize_resource

        def create
          @open_call.save!
          render json: OpenCallSerializer.new(
            @open_call,
            include: included_relationships,
            params: {current_user: current_user}
          ).serializable_hash
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
            investor_id: current_user.account.investor_id,
            language: current_user.account.language
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
            sdgs: [],
            instrument_types: []
          )
        end
      end
    end
  end
end
