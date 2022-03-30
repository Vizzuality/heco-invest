module API
  module V1
    class ResetPasswordsController < BaseController
      def create
        User.send_reset_password_instructions(create_params)
        head :ok
      end

      def update
        user = User.reset_password_by_token(update_params)
        if user.errors.empty?
          sign_in user
          render json: UserSerializer.new(user).serializable_hash
        else
          render_validation_errors user
        end
      end

      private

      def create_params
        params.permit(:email)
      end

      def update_params
        params.permit(:reset_password_token, :password)
      end
    end
  end
end
