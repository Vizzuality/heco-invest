module Backoffice
  class UsersController < BaseController
    include Sections

    before_action :fetch_admin, only: [:edit, :update, :destroy]
    before_action :set_breadcrumbs, only: [:edit, :update]
    before_action :set_sections, only: [:edit, :update]

    def index
      @q = User.ransack params[:q]
      @users = @q.result.includes(:owner_account, account: %i[project_developer investor])
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

    def edit
    end

    def update
      if @user.update(user_params)
        redirect_back(
          fallback_location: edit_backoffice_user_path(@user.id),
          notice: t("backoffice.messages.success_update", model: t("backoffice.common.user"))
        )
      else
        render :edit, status: :unprocessable_entity
      end
    end

    def destroy
      if @user.destroy
        redirect_to backoffice_users_path, status: :see_other,
          notice: t("backoffice.messages.success_delete", model: t("backoffice.common.user"))
      else
        redirect_to backoffice_users_path, status: :see_other, alert: @user.errors.first.full_message
      end
    end

    private

    def user_params
      params.require(:user).permit(
        :avatar,
        :first_name,
        :last_name
      )
    end

    def fetch_admin
      @user = User.find(params[:id])
    end

    def set_breadcrumbs
      add_breadcrumb(I18n.t("backoffice.layout.users"), backoffice_users_path)
      add_breadcrumb(@user.full_name)
    end

    def set_sections
      sections %w[information], default: "information"
    end
  end
end
