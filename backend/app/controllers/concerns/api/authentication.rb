module API
  module Authentication
    include Devise::Controllers::Helpers

    def self.included(base)
      base.before_action :set_csrf_cookie
    end

    def current_user
      warden.user
    end

    def require_user!
      raise API::UnauthorizedError, "You need to sign in before making this request" if current_user.nil?
    end

    def set_csrf_cookie
      cookies["csrf_token"] = form_authenticity_token
    end
  end
end
