module API
  module V1
    class LocationsController < BaseController
      before_action :fetch_location, only: :show

      def index
        locations = apply_filter_for Location.all.includes(:regions, parent: :parent)
        render json: LocationSerializer.new(
          locations,
          include: included_relationships,
          fields: sparse_fieldset
        ).serializable_hash
      end

      def show
        render json: LocationSerializer.new(
          @location,
          include: included_relationships,
          fields: sparse_fieldset
        ).serializable_hash
      end

      private

      def apply_filter_for(query)
        query = query.where location_type: filter_params[:location_type] if filter_params[:location_type].present?
        query = query.where parent_id: filter_params[:parent_id] if filter_params[:parent_id].present?
        query
      end

      def fetch_location
        @location = Location.find(params[:id])
      end

      def filter_params
        params.fetch(:filter, {}).permit :location_type, :parent_id
      end
    end
  end
end
