module API
  module V1
    class OpenCallsController < BaseController
      include API::Pagination

      def index
        open_calls = OpenCall.all.includes(:investor)
        pagy_object, open_calls = pagy(open_calls, page: current_page, items: per_page)
        render json: OpenCallSerializer.new(
          open_calls,
          links: pagination_links(:api_v1_open_calls_path, pagy_object),
          meta: pagination_meta(pagy_object)
        ).serializable_hash
      end

      def show
        open_call = fetch_open_call

        render json: OpenCallSerializer.new(open_call).serializable_hash
      end

      private

      def fetch_open_call
        OpenCall.friendly.find(params[:id])
      end
    end
  end
end
