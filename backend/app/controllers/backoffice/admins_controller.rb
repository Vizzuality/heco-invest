module Backoffice
  class AdminsController < BaseController
    before_action :initialize_admin, only: [:new, :create]
    before_action :set_breadcrumbs, only: [:new, :create]

    def index
      @q = Admin.ransack params[:q]
      @admins = @q.result
      @admins = @admins.search params.dig(:q, :filter_full_text) if params.dig(:q, :filter_full_text).present?

      respond_to do |format|
        format.html do
          @pagy_object, @admins = pagy @admins, pagy_defaults
        end
        format.csv do
          send_data Backoffice::CSV::AdminExporter.new(@admins).call,
            filename: "admins.csv",
            type: "text/csv; charset=utf-8"
        end
      end
    end

    def new
    end

    def create
      if @admin.update admin_params.merge(password: GeneratePassword.new(50).call)
        AdminMailer.first_time_login_instructions(@admin).deliver_later
        redirect_to backoffice_admins_url, notice: t("backoffice.messages.success_create", model: t("backoffice.common.admin"))
      else
        render :new, status: :unprocessable_entity
      end
    end

    private

    def admin_params
      params.require(:admin).permit(
        :first_name,
        :last_name,
        :ui_language,
        :email
      )
    end

    def initialize_admin
      @admin = Admin.new
    end

    def set_breadcrumbs
      add_breadcrumb(I18n.t("backoffice.layout.admins"), backoffice_admins_path)
      @admin.new_record? ? add_breadcrumb(I18n.t("backoffice.admins.form.new")) : add_breadcrumb(@admin.full_name)
    end
  end
end
