module Backoffice
  class ProjectDevelopersController < BaseController
    before_action :fetch_project_developer, only: [:edit, :update]

    def index
      @q = ProjectDeveloper.ransack params[:q]
      @pagy_object, @project_developers = pagy @q.result.includes(account: [:owner]), pagy_defaults
    end

    def edit
    end

    def update
      if @project_developer.update(update_params)
        redirect_to backoffice_project_developers_url,
          notice: t("backoffice.messages.success_update", model: t("backoffice.common.project_developer"))
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
  end
end
