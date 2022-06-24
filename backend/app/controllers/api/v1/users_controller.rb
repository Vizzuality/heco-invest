module API
  module V1
    class UsersController < BaseController
      before_action :authenticate_user!, only: [:show]

      def create
        user = params[:invitation_token].present? ? preload_invited_user : User.new(user_params)
        user.skip_confirmation!
        user.save!
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

      def preload_invited_user
        User.find_by_invitation_token(params[:invitation_token], true).tap do |user|
          raise ActiveRecord::RecordNotFound if user.blank? || user.invited_by.blank?

          user.assign_attributes user_params.except(:email)
          user.skip_confirmation!
        end
      end
    end
  end
end
