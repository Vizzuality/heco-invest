module API
  module V1
    class UsersController < BaseController
      before_action :authenticate_user!, only: [:update, :show, :change_password]

      def create
        user = params[:invitation_token].present? ? preload_invited_user : User.new(create_params)
        user.skip_confirmation!
        user.save!
        sign_in user
        render json: UserSerializer.new(user)
      end

      def update
        current_user.update! update_params
        render json: UserSerializer.new(current_user).serializable_hash
      end

      def show
        render json: UserSerializer.new(current_user).serializable_hash
      end

      def change_password
        if current_user.update_with_password change_password_params
          bypass_sign_in current_user
          head :ok
        else
          render_validation_errors current_user
        end
      end

      private

      def create_params
        params.permit(:first_name, :last_name, :email, :password, :ui_language, :otp_required_for_login)
      end

      def update_params
        params.permit :first_name, :last_name, :otp_required_for_login
      end

      def change_password_params
        params.permit :current_password, :password, :password_confirmation
      end

      def preload_invited_user
        User.find_by_invitation_token(params[:invitation_token], true).tap do |user|
          raise ActiveRecord::RecordNotFound if user.blank? || user.invited_by.blank?

          user.assign_attributes create_params.except(:email)
          user.skip_confirmation!
        end
      end
    end
  end
end
