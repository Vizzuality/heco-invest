module API
  module V1
    class DirectUploadsController < ActiveStorage::DirectUploadsController
      include API::Errors
      include API::Authentication
      include API::Localization

      before_action :authenticate_user!
    end
  end
end
