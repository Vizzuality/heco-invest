module Backoffice
  class ProjectDevelopersController < BaseController
    include Sections
    include ContentLanguage

    before_action :fetch_project_developer, only: [:edit, :update, :destroy]
    before_action :set_breadcrumbs, only: [:edit, :update]
    before_action :set_sections, only: [:edit, :update]
    before_action :set_content_language_default, only: [:edit, :update]

    def index
      @q = ProjectDeveloper.ransack params[:q]
      @project_developers = API::Filterer.new(@q.result, {full_text: params.dig(:q, :filter_full_text)}).call
      @project_developers = @project_developers.includes(account: [:owner])

      respond_to do |format|
        format.html do
          @pagy_object, @project_developers = pagy @project_developers, pagy_defaults
        end
        format.csv do
          send_data Backoffice::CSV::ProjectDeveloperExporter.new(@project_developers).call,
            filename: "project_developers.csv",
            type: "text/csv; charset=utf-8"
        end
      end
    end

    def edit
    end

    def update
      if I18n.with_locale(update_language) { @project_developer.update(update_params) }
        redirect_back(
          fallback_location: edit_backoffice_project_developer_path(@project_developer.id),
          notice: t("backoffice.messages.success_update", model: t("backoffice.common.project_developer"))
        )
      else
        render :edit, status: :unprocessable_entity
      end
    end

    def destroy
      Accounts::Destroy.new(@project_developer.account).call
      redirect_to backoffice_project_developers_path, status: :see_other, notice: t("backoffice.messages.success_delete", model: t("backoffice.common.project_developer"))
    end

    private

    def update_params
      params.require(:project_developer).permit(
        :project_developer_type,
        :entity_legal_registration_number,
        :mission,
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
        impacts: [],
        priority_landscape_ids: []
      )
    end

    def update_language
      update_params.dig(:account_attributes, :language).presence || content_language
    end

    def fetch_project_developer
      @project_developer = ProjectDeveloper.find(params[:id])
    end

    def set_breadcrumbs
      add_breadcrumb(I18n.t("backoffice.layout.project_developers"), backoffice_project_developers_path)
      add_breadcrumb(@project_developer.name)
    end

    def set_sections
      sections %w[language profile status owner], default: "profile"
    end

    def set_content_language_default
      @content_language_default = @project_developer.language
    end
  end
end
