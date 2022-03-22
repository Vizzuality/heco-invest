module API
  module Authentication
    def self.included(base)
      base.before_action :set_csrf_cookie
    end

    def set_csrf_cookie
      cookies["csrf_token"] = form_authenticity_token
    end
  end
end
