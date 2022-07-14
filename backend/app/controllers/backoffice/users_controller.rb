module Backoffice
  class UsersController < BaseController
    def index
      @q = User.ransack params[:q]
      @users = @q.result.includes(:account)
      @users = @users.search params.dig(:q, :filter_full_text) if params.dig(:q, :filter_full_text).present?

      respond_to do |format|
        format.html do
          @pagy_object, @users = pagy @users, pagy_defaults
        end
        format.csv do
          send_data Backoffice::CSV::UserExporter.new(@users).call,
            filename: "users.csv",
            type: "text/csv; charset=utf-8"
        end
      end
    end
  end
end
