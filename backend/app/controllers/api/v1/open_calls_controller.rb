module API
  module V1
    class OpenCallsController < BaseController
      include API::Pagination

      before_action :fetch_open_call, only: [:show]

      def index
        open_calls = OpenCall.all.includes(:investor)
        open_calls = API::Filterer.new(open_calls, filter_params.to_h).call
        pagy_object, open_calls = pagy(open_calls, page: current_page, items: per_page)
        render json: OpenCallSerializer.new(
          open_calls,
          fields: sparse_fieldset,
          links: pagination_links(:api_v1_open_calls_path, pagy_object),
          meta: pagination_meta(pagy_object)
        ).serializable_hash
      end

      def show
        render json: OpenCallSerializer.new(
          @open_call,
          fields: sparse_fieldset
        ).serializable_hash
      end

      private

      def fetch_open_call
        @open_call = OpenCall.friendly.find(params[:id])
      end

      def filter_params
        params.fetch(:filter, {})
          .permit :sdg, :instrument_type, :ticket_size, sdg: [], instrument_type: [], ticket_size: []
      end
    end
  end
end
