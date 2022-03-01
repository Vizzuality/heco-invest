module API
  module V1
    class BaseController < ActionController::API
      include ActionController::Cookies
      include ActionController::RequestForgeryProtection
      include API::Errors
      include API::Authentication

      protect_from_forgery with: :exception

      wrap_parameters format: [:json]

      before_action :require_json!
      around_action :set_locale

      private

      def require_json!
        return if request.get? || request.content_type.to_s.starts_with?("application/json")

        raise API::Error, "application/json content type is required by the requested endpoint"
      end

      def set_locale(&action)
        locale = if params[:locale].present? && I18n.available_locales.map(&:to_s).include?(params[:locale])
          params[:locale]
        else
          I18n.default_locale.to_s
        end
        I18n.with_locale(locale, &action)
      end
    end
  end
end
