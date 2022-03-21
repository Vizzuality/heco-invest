module API
  module V1
    class SessionsController < BaseController
      before_action :require_user!, only: [:destroy]

      def create
        user = User.find_by_email(params[:email])

        if user&.valid_password?(params[:password])
          sign_in user # warden checks devise options like confirmable

          render json: UserSerializer.new(user).serializable_hash
        else
          raise API::UnprocessableEntityError, "Invalid email or password"
        end
      end

      def destroy
        sign_out current_user
        render json: {data: nil}
      end
    end
  end
end
