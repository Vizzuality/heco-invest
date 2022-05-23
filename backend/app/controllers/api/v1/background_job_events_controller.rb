module API
  module V1
    class BackgroundJobEventsController < BaseController
      include API::Pagination

      before_action :authenticate_user! # TODO: Only Admin can access!

      def index
        events = apply_filter_to BackgroundJobEvent.all
        pagy_object, events = pagy(events, page: current_page, items: per_page)
        render json: BackgroundJobEventSerializer.new(
          events,
          links: pagination_links(:api_v1_background_job_events_path, pagy_object),
          meta: pagination_meta(pagy_object)
        ).serializable_hash
      end

      private

      def apply_filter_to(query)
        query = query.where(status: filter_params[:status]) if filter_params[:status].present?
        query = query.where(created_at: filter_params[:created_at_min]..) if filter_params[:created_at_min].present?
        query = query.where(created_at: ..filter_params[:created_at_max]) if filter_params[:created_at_max].present?
        query
      end

      def filter_params
        params.fetch(:filter, {}).permit :status, :created_at_min, :created_at_max
      end
    end
  end
end
