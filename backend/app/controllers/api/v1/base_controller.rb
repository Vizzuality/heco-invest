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

      def require_json!
        return if request.get? || request.content_type.to_s.starts_with?("application/json")

        raise API::Error, "application/json content type is required by the requested endpoint"
      end
    end
  end
end
