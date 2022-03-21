module API
  module V1
    class UsersController < BaseController
      before_action :require_user!, only: [:show]

      def create
        user = User.create!(user_params)
        sign_in user
        render json: UserSerializer.new(user)
      end

      def show
        render json: UserSerializer.new(current_user).serializable_hash
      end

      private

      def user_params
        params.permit(:first_name, :last_name, :email, :password, :ui_language)
      end
    end
  end
end
