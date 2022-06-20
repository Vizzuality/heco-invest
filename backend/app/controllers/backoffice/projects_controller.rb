module Backoffice
  class ProjectsController < BaseController
    include Sections
    include ContentLanguage

    before_action :fetch_project, only: [:edit, :update]
    before_action :set_breadcrumbs, only: [:edit, :update]
    before_action :set_sections, only: [:edit, :update]
    before_action :set_content_language_default, only: [:edit, :update]

    def index
      @q = Project.ransack params[:q]
      @projects = API::Filterer.new(@q.result, {full_text: params.dig(:q, :filter_full_text)}).call
      @projects = @projects.includes(:priority_landscape, project_developer: [:account])

      respond_to do |format|
        format.html do
          @pagy_object, @projects = pagy @projects, pagy_defaults
        end
        format.csv do
          send_data Backoffice::CSV::ProjectExporter.new(@projects).call,
            filename: "projects.csv",
            type: "text/csv; charset=utf-8"
        end
      end
    end

    def edit
    end

    def update
      if @project.update(update_params)
        redirect_back(
          fallback_location: edit_backoffice_project_path(@project.friendly_id),
          notice: t("backoffice.messages.success_update", model: t("backoffice.common.project"))
        )
      else
        render :edit, status: :unprocessable_entity
      end
    end

    private

    def update_params
      params.require(:project).permit(
        :name_en,
        :name_es,
        :name_pt,
        :country_id,
        :department_id,
        :municipality_id,
        # :shapefile # TODO: add support for shapefile
        :project_developer_id,
        :development_stage,
        :estimated_duration_in_months,
        :category,
        :problem_en,
        :problem_es,
        :problem_pt,
        :solution_en,
        :solution_es,
        :solution_pt,
        :expected_impact_en,
        :expected_impact_es,
        :expected_impact_pt,
        :looking_for_funding,
        :ticket_size,
        :funding_plan_en,
        :funding_plan_es,
        :funding_plan_pt,
        :received_funding,
        :received_funding_amount_usd,
        :received_funding_investor,
        :replicability_en,
        :replicability_es,
        :replicability_pt,
        :sustainability_en,
        :sustainability_es,
        :sustainability_pt,
        :progress_impact_tracking_en,
        :progress_impact_tracking_es,
        :progress_impact_tracking_pt,
        :description_en,
        :description_es,
        :description_pt,
        :relevant_links_en,
        :relevant_links_es,
        :relevant_links_pt,
        :trusted,
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
      @project = Project.friendly.find(params[:id])
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
