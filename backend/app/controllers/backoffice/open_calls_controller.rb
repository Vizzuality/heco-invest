module Backoffice
  class OpenCallsController < BaseController
    include Sections
    include ContentLanguage

    before_action :fetch_open_call, only: [:edit, :update, :destroy, :verify, :unverify]
    before_action :set_breadcrumbs, only: [:edit, :update]
    before_action :set_sections, only: [:edit, :update]
    before_action :set_content_language_default, only: [:edit, :update]

    def index
      @q = OpenCall.ransack params[:q]
      @open_calls = @q.result.includes(:country, :municipality, :department, investor: [:account])
      @open_calls = @open_calls.order(:created_at)

      respond_to do |format|
        format.html do
          @pagy_object, @open_calls = pagy @open_calls, pagy_defaults
        end
        format.csv do
          send_data Backoffice::CSV::OpenCallExporter.new(@open_calls).call,
            filename: "open_calls.csv",
            type: "text/csv; charset=utf-8"
        end
      end
    end

    def edit
    end

    def update
      if I18n.with_locale(content_language) { @open_call.update(update_params) }
        redirect_back(
          fallback_location: edit_backoffice_open_call_path(@open_call.id),
          notice: t("backoffice.messages.success_update", model: t("backoffice.common.open_call"))
        )
      else
        render :edit, status: :unprocessable_entity
      end
    end

    def destroy
      @open_call.destroy!
      InvestorMailer.open_call_destroyed(@open_call.investor, @open_call.name).deliver_later

      redirect_to backoffice_open_calls_path, status: :see_other, notice: t("backoffice.messages.success_delete", model: t("backoffice.common.open_call"))
    end

    def verify
      @open_call.update! trusted: true

      redirect_back fallback_location: backoffice_open_calls_path
    end

    def unverify
      @open_call.update! trusted: false

      redirect_back fallback_location: backoffice_open_calls_path
    end

    private

    def update_params
      params.require(:open_call).permit(
        :name,
        :picture,
        :investor_id,
        :description,
        :impact_description,
        :closing_at,
        :country_id,
        :department_id,
        :municipality_id,
        :maximum_funding_per_project,
        :funding_priorities,
        :funding_exclusions,
        :trusted,
        instrument_types: [],
        sdgs: []
      )
    end

    def fetch_open_call
      @open_call = OpenCall.find(params[:id])
    end

    def set_breadcrumbs
      add_breadcrumb(I18n.t("backoffice.layout.open_calls"), backoffice_open_calls_path)
      add_breadcrumb(@open_call.name)
    end

    def set_sections
      sections %w[information status investor], default: "information"
    end

    def set_content_language_default
      @content_language_default = @open_call.language
    end
  end
end
