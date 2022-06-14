module API
  module V1
    class InvitationsController < BaseController
      before_action :authenticate_user!, except: :update
      before_action :fetch_user_by_email, only: :create
      before_action :fetch_user_by_token, only: :update
      before_action :require_light_account!

      def create
        authorize! :invite, @user

        @user.invite! current_user
        head :ok
      end

      def update
        @user.with_lock do
          @user.assign_attributes params.permit(:password, :first_name, :last_name, :ui_language)
          @user.assign_attributes @user.invited_by&.attributes&.slice("role", "account_id") if @user.invited_by.present?
          @user.save!
          @user.accept_invitation!
          render json: UserSerializer.new(@user)
        end
      end

      private

      def require_light_account!
        head :conflict if @user.account_id.present?
      end

      def fetch_user_by_email
        raise API::UnprocessableEntityError if params[:email].blank? || params[:email].match(Devise.email_regexp).blank?
        @user = User.find_by_email(params[:email]) || User.new(email: params[:email])
      end

      def fetch_user_by_token
        @user = User.find_by_invitation_token(params[:invitation_token], true)
        raise ActiveRecord::RecordNotFound if @user.blank?
      end
    end
  end
end
