module API
  module V1
    module Accounts
      class BaseController < API::V1::BaseController
        before_action :authenticate_user!

        private

        def require_project_developer!
          return if current_user.project_developer?

          raise API::UnauthorizedError, I18n.t("errors.messages.user.no_project_developer")
        end

        def require_investor!
          return if current_user.investor?

          raise API::UnauthorizedError, I18n.t("errors.messages.user.no_investor")
        end
      end
    end
  end
end
