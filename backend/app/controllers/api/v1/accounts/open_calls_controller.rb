module API
  module V1
    module Accounts
      class OpenCallsController < BaseController
        include API::Pagination

        load_and_authorize_resource

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
      end
    end
  end
end
