module Backoffice
  module HttpAuth
    extend ActiveSupport::Concern

    included do
      before_action :http_auth
    end

    def http_auth
      return unless ENV["HTTP_AUTH_USERNAME"].present? && ENV["HTTP_AUTH_PASSWORD"].present?

      authenticate_or_request_with_http_basic do |username, password|
        username == ENV["HTTP_AUTH_USERNAME"] && password == ENV["HTTP_AUTH_PASSWORD"]
      end
    end
  end
end
