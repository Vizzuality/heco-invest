module API
  module V1
    class SessionsController < BaseController
      before_action :authenticate_user!, only: [:destroy]

      def create
        user = User.find_by_email(params[:email])

        if user&.valid_password?(params[:password])
          # warden checks devise options like confirmable
          # if not confirmed then throws an error that is handled by failure_app
          sign_in user
          render json: UserSerializer.new(user).serializable_hash
        else
          raise API::UnprocessableEntityError, I18n.t("devise.failure.invalid", authentication_keys: :email)
        end
      end

      def destroy
        user = current_user
        sign_out user
        user.invalidate_session!
        head :ok
      end
    end
  end
end
