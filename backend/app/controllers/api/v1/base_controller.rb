module API
  module V1
    class BaseController < ActionController::API
      include ActionController::Cookies
      include ActionController::RequestForgeryProtection
      include API::Errors
      include API::Authentication
      include API::Localization

      protect_from_forgery with: :exception

      wrap_parameters format: [:json]

      before_action :require_json!

      private

      def sparse_fieldset
        (params[:fields]&.to_unsafe_h || {}).transform_values { |v| v.split(",") }
      end

      def included_relationships
        params[:includes]&.split(",")
      end

      def require_json!
        return if request.get? || request.content_type.to_s.starts_with?("application/json")

        raise API::Error, "application/json content type is required by the requested endpoint"
      end

      def fetching_by_uuid?(value = params[:id])
        /\A[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\z/.match?(value)
      end
    end
  end
end
