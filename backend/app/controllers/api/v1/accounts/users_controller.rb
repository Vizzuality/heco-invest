module API
  module V1
    module Accounts
      class UsersController < BaseController
        load_and_authorize_resource

        def index
          @users = @users.where(account_id: current_user.account_id).where.not(account_id: nil)
            .or(@users.where(invited_by: current_user, account_id: nil)).includes(:account, :owner_account).order(:created_at)
          @users = @users.search filter_params[:full_text] if filter_params[:full_text].present?
          render json: UserSerializer.new(
            @users,
            params: {current_user: current_user}
          ).serializable_hash
        end

        def destroy
          # @user cannot be account owner AND
          # either current_user == @user OR current_user is account owner in @user's account OR @user is invited by current_user
          @user.destroy!
          UserMailer.destroyed(@user.email, @user.full_name, @user.locale).deliver_later
          head :ok
        end

        def transfer_ownership
          user = @users.find params[:user_id]
          current_user.account.update! owner: user
          UserMailer.ownership_transferred(user).deliver_later
          render json: UserSerializer.new(user, params: {current_user: user}).serializable_hash
        end

        private

        def filter_params
          params.fetch(:filter, {}).permit :full_text
        end
      end
    end
  end
end
