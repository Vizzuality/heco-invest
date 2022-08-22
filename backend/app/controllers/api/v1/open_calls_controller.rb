module API
  module V1
    class OpenCallsController < BaseController
      include API::Pagination

      before_action :fetch_open_call, only: [:show]
      around_action(only: [:show]) { |_, action| set_locale(fallback_language: @open_call&.investor&.account&.language, &action) }
      load_and_authorize_resource

      def index
        open_calls = @open_calls.all.includes({investor: :account})
        open_calls = API::Filterer.new(open_calls, filter_params.to_h).call
        open_calls = API::Sorter.new(open_calls, sorting_by: params[:sorting]).call
        pagy_object, open_calls = pagy(open_calls, page: current_page, items: per_page)
        render json: OpenCallSerializer.new(
          open_calls,
          include: included_relationships,
          fields: sparse_fieldset,
          links: pagination_links(:api_v1_open_calls_path, pagy_object),
          meta: pagination_meta(pagy_object),
          params: {current_user: current_user}
        ).serializable_hash
      end

      def show
        render json: OpenCallSerializer.new(
          @open_call,
          include: included_relationships,
          fields: sparse_fieldset,
          params: {current_user: current_user}
        ).serializable_hash
      end

      private

      def fetch_open_call
        @open_call = OpenCall.friendly.find(params[:id])
      end

      def filter_params
        params.fetch(:filter, {}).permit :sdg, :instrument_type, :only_verified, :full_text
      end
    end
  end
end
