module Backoffice
  class ProjectsController < BaseController
    include Sections
    include ContentLanguage

    before_action :fetch_project, only: [:edit, :update, :destroy, :verify, :unverify]
    before_action :set_breadcrumbs, only: [:edit, :update]
    before_action :set_sections, only: [:edit, :update]
    before_action :set_content_language_default, only: [:edit, :update]

    def index
      @q = Project.ransack params[:q]
      @projects = API::Filterer.new(@q.result, {full_text: params.dig(:q, :filter_full_text)}).call
      @projects = @projects.includes(:priority_landscape, project_developer: [:account])
      @projects = @projects.order(:created_at)

      respond_to do |format|
        format.html do
          @pagy_object, @projects = pagy @projects, pagy_defaults
        end
        format.csv do
          @projects = @projects.includes(:involved_project_developers, :country, :department, :municipality)
          send_data Backoffice::CSV::ProjectExporter.new(@projects).call,
            filename: "projects.csv",
            type: "text/csv; charset=utf-8"
        end
      end
    end

    def edit
    end

    def update
      if I18n.with_locale(content_language) { @project.update(update_params) }
        redirect_back(
          fallback_location: edit_backoffice_project_path(@project.id),
          notice: t("backoffice.messages.success_update", model: t("backoffice.common.project"))
        )
      else
        render :edit, status: :unprocessable_entity
      end
    end

    def destroy
      Projects::Destroy.new(@project).call
      redirect_to backoffice_projects_path, status: :see_other, notice: t("backoffice.messages.success_delete", model: t("backoffice.common.project"))
    end

    def verify
      @project.update! verified: true

      redirect_back fallback_location: backoffice_projects_path
    end

    def unverify
      @project.update! verified: false

      redirect_back fallback_location: backoffice_projects_path
    end

    private

    def update_params
      params.require(:project).permit(
        :name,
        :country_id,
        :department_id,
        :municipality_id,
        :geometry,
        :project_developer_id,
        :development_stage,
        :estimated_duration_in_months,
        :category,
        :problem,
        :solution,
        :expected_impact,
        :looking_for_funding,
        :ticket_size,
        :funding_plan,
        :received_funding,
        :received_funding_amount_usd,
        :received_funding_investor,
        :replicability,
        :sustainability,
        :progress_impact_tracking,
        :description,
        :relevant_links,
        :verified,
        :positive_financial_returns,
        :last_year_sales_revenue,
        :climate_change_risks_details,
        :climate_change_risks_identified,
        instrument_types: [],
        impact_areas: [],
        sdgs: [],
        target_groups: [],
        involved_project_developer_ids: []
      ).merge(project_images_params_of(@project))
    end

    def project_images_params_of(project)
      images = params.dig(:project, :project_images).to_a.reject(&:blank?)
      return {} if images.blank?

      {project_images_attributes: project.project_images.map { |i| {id: i.id, _destroy: true} } + images.map { |i| {file: i} }}
    end

    def fetch_project
      @project = Project.find(params[:id])
    end

    def set_breadcrumbs
      add_breadcrumb(I18n.t("backoffice.layout.projects"), backoffice_projects_path)
      add_breadcrumb(@project.name)
    end

    def set_sections
      sections %w[information status project_developers], default: "information"
    end

    def set_content_language_default
      @content_language_default = @project.language
    end
  end
end
