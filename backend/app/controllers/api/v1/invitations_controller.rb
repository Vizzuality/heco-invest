module API
  module V1
    class InvitationsController < BaseController
      before_action :authenticate_user!, except: :info
      before_action :fetch_user_by_token, only: %i[info update]
      before_action :require_light_account!, only: %i[info update]

      def create
        authorize! :invite, User

        response = params[:emails].to_a.each_with_object({}) do |email, statuses|
          next statuses[email] = 422 if email.match(Devise.email_regexp).blank?

          user = User.find_by_email(email) || User.new(email: email)
          next statuses[email] = 409 if user.account_id.present?

          user.invite! current_user
          statuses[email] = 200
        end
        render json: response.to_json
      end

      def update
        raise API::Forbidden unless current_user == @user

        @user.with_lock do
          @user.update! @user.invited_by.attributes.slice("role", "account_id")
          @user.accept_invitation!
          render json: UserSerializer.new(@user).serializable_hash
        end
      end

      def info
        render json: {
          email: @user.email,
          account_name: @user.invited_by.account.name,
          requires_registration: @user.encrypted_password.blank?
        }.to_json
      end

      private

      def require_light_account!
        head :conflict if @user.account_id.present?
      end

      def fetch_user_by_token
        @user = User.find_by_invitation_token(params[:invitation_token], true)
        raise ActiveRecord::RecordNotFound if @user.blank? || @user.invited_by.blank?
      end
    end
  end
end
