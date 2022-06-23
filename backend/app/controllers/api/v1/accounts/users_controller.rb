module API
  module V1
    module Accounts
      class UsersController < BaseController
        include API::Pagination

        load_and_authorize_resource

        def index
          @users = @users.where(account_id: current_user.account_id).where.not(account_id: nil)
            .or(@users.where(invited_by: current_user, account_id: nil)).order(:created_at)
          pagy_object, @users = pagy(@users, page: current_page, items: per_page)
          render json: UserSerializer.new(
            @users,
            links: pagination_links(:api_v1_account_users_path, pagy_object),
            meta: pagination_meta(pagy_object),
            params: {current_user: current_user}
          ).serializable_hash
        end
      end
    end
  end
end
