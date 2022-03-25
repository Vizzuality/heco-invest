module API
  module V1
    class EmailConfirmationsController < BaseController
      def create
        User.send_confirmation_instructions(create_params)
        head :ok
      end

      def show
        user = User.confirm_by_token(params[:confirmation_token])

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
    end
  end
end
