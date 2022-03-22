module API
  module V1
    class CsrfController < BaseController
      def show
        render json: {token: form_authenticity_token}
      end
    end
  end
end
