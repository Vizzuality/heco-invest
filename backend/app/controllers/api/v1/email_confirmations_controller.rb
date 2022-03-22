module API
  module V1
    class EmailConfirmationsController < BaseController
      def show
        user = User.confirm_by_token(params[:confirmation_token])

        if user.errors.empty?
          sign_in user
          render json: UserSerializer.new(user).serializable_hash
        else
          render_validation_errors user
        end
      end
    end
  end
end
