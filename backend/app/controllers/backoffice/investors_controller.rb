module Backoffice
  class InvestorsController < BaseController
    include Sections
    include ContentLanguage

    before_action :fetch_investor, only: [:edit, :update, :destroy]
    before_action :set_breadcrumbs, only: [:edit, :update]
    before_action :set_sections, only: [:edit, :update]
    before_action :set_content_language_default, only: [:edit, :update]

    def index
      @q = Investor.ransack params[:q]
      @investors = API::Filterer.new(@q.result, {full_text: params.dig(:q, :filter_full_text)}).call
      @investors = @investors.includes(account: [:owner])

      respond_to do |format|
        format.html do
          @pagy_object, @investors = pagy @investors, pagy_defaults
        end
        format.csv do
          send_data Backoffice::CSV::InvestorExporter.new(@investors).call,
            filename: "investors.csv",
            type: "text/csv; charset=utf-8"
        end
      end
    end

    def edit
    end

    def update
      if I18n.with_locale(update_language) { @investor.update(update_params) }
        redirect_back(
          fallback_location: edit_backoffice_investor_path(@investor.id),
          notice: t("backoffice.messages.success_update", model: t("backoffice.common.investor"))
        )
      else
        render :edit, status: :unprocessable_entity
      end
    end

    def destroy
      Accounts::Destroy.new(@investor.account).call
      redirect_to backoffice_investors_path, status: :see_other, notice: t("backoffice.messages.success_delete", model: t("backoffice.common.investor"))
    end

    private

    def update_params
      params.require(:investor).permit(
        :investor_type,
        :previously_invested,
        :mission,
        :prioritized_projects_description,
        :other_information,
        account_attributes: [
          :id,
          :picture,
          :name,
          :language,
          :review_status,
          :about,
          :website,
          :linkedin,
          :facebook,
          :twitter,
          :instagram,
          :contact_email,
          :contact_phone,
          :owner_id
        ],
        categories: [],
        instrument_types: [],
        ticket_sizes: [],
        impacts: [],
        sdgs: []
      )
    end

    def update_language
      update_params.dig(:account_attributes, :language).presence || content_language
    end

    def fetch_investor
      @investor = Investor.find(params[:id])
    end

    def set_breadcrumbs
      add_breadcrumb(I18n.t("backoffice.layout.investors"), backoffice_investors_path)
      add_breadcrumb(@investor.name)
    end

    def set_sections
      sections %w[language profile status owner], default: "profile"
    end

    def set_content_language_default
      @content_language_default = @investor.language
    end
  end
end
