module API
  module V1
    class SessionsController < BaseController
      before_action :authenticate_user!, only: [:destroy]

      def create
        user = User.find_by_email(params[:email])

        if user&.valid_password?(params[:password]) &&
            !(user&.otp_required_for_login? && !user.validate_and_consume_otp!(params[:otp_attempt]))
          # warden checks devise options like confirmable
          # if not confirmed then throws an error that is handled by failure_app
          sign_in user
          render json: UserSerializer.new(user).serializable_hash
        else
          raise API::UnprocessableEntityError, I18n.t("devise.failure.invalid", authentication_keys: :email)
        end
      end

      def destroy
        sign_out current_user
        head :ok
      end

      def two_factor_auth
        user = User.find_by_email(params[:email])
        return render json: {data: false} unless user&.valid_password?(params[:password]) && user&.otp_required_for_login?

        user.update! otp_secret: User.generate_otp_secret(6)
        UserMailer.send_otp_code(user).deliver_later
        render json: {data: true}
      end
    end
  end
end
