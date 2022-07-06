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
          # either current_user == @user OR current_user is account owner in @user's account
          @user.destroy!
          head :ok
        end

        private

        def filter_params
          params.fetch(:filter, {}).permit :full_text
        end
      end
    end
  end
end
