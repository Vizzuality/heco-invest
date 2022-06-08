module Backoffice
  class ProjectDevelopersController < BaseController
    before_action :fetch_project_developer, only: [:edit, :update]
    before_action :set_breadcrumbs, only: [:edit, :update]

    helper_method :content_language
    helper_method :section_partial

    def index
      @q = ProjectDeveloper.ransack params[:q]
      @pagy_object, @project_developers = pagy @q.result.includes(account: [:owner]), pagy_defaults
    end

    def edit
    end

    def update
      if @project_developer.update(update_params)
        redirect_back(
          fallback_location: edit_backoffice_project_developer_path(@project_developer.id),
          notice: t("backoffice.messages.success_update", model: t("backoffice.common.project_developer"))
        )
      else
        render :edit, status: :unprocessable_entity
      end
    end

    private

    def update_params
      params.require(:project_developer).permit(
        :name,
        :language,
        :project_developer_type,
        :entity_legal_registration_number,
        :mission_en,
        :mission_es,
        :mission_pt,
        account_attributes: [
          :id,
          :name,
          :language,
          :review_status,
          :about_en,
          :about_es,
          :about_pt,
          :website,
          :linkedin,
          :facebook,
          :twitter,
          :instagram,
          :contact_email,
          :contact_phone
        ],
        categories: [],
        impacts: [],
        mosaics: []
      )
    end

    def fetch_project_developer
      @project_developer = ProjectDeveloper.find(params[:id])
    end

    def set_breadcrumbs
      add_breadcrumb(I18n.t("backoffice.layout.project_developers"), backoffice_project_developers_path)
      add_breadcrumb(@project_developer.name)
    end

    def content_language
      Language::TYPES.map(&:to_s).include?(params[:content_lang]&.downcase) ? params[:content_lang].downcase : @project_developer.language
    end

    def section_partial
      "section_#{section_key}"
    end

    def section_key
      %w[language profile status].include?(params[:section]&.downcase) ? params[:section].downcase : "profile"
    end
  end
end
