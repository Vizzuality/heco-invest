module API
  module V1
    module Accounts
      class BaseController < API::V1::BaseController
        before_action :authenticate_user!
      end
    end
  end
end
