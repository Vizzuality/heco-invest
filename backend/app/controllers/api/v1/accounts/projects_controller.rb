module API
  module V1
    module Accounts
      class ProjectsController < BaseController
        include API::Pagination

        before_action :fetch_project, only: [:update, :destroy]
        around_action(only: %i[create update]) { |_, action| set_locale(language: current_user&.account&.language, &action) }
        load_and_authorize_resource

        def index
          projects = @projects.includes(:project_developer, :involved_project_developers, project_images: {file_attachment: :blob})
          projects = projects.dynamic_search ["name_#{I18n.locale}"], filter_params[:full_text], [] if filter_params[:full_text].present?
          projects = projects.order(created_at: :desc)
          render json: ProjectSerializer.new(
            projects,
            include: included_relationships,
            fields: sparse_fieldset,
            params: {current_user: current_user}
          ).serializable_hash
        end

        def create
          @project.save!
          render json: ProjectSerializer.new(
            @project,
            include: included_relationships,
            params: {current_user: current_user}
          ).serializable_hash
        end

        def update
          @project.update! update_params
          render json: ProjectSerializer.new(
            @project,
            include: included_relationships,
            params: {current_user: current_user}
          ).serializable_hash
        end

        def destroy
          ::Projects::Destroy.new(@project).call
          head :ok
        end

        def favourites
          @projects = @projects.includes(:project_developer, :involved_project_developers, project_images: {file_attachment: :blob})
            .order(created_at: :desc)
          pagy_object, @projects = pagy(@projects, page: current_page, items: per_page)
          render json: ProjectSerializer.new(
            @projects,
            include: included_relationships,
            fields: sparse_fieldset,
            links: pagination_links(:api_v1_projects_path, pagy_object),
            meta: pagination_meta(pagy_object),
            params: {current_user: current_user}
          ).serializable_hash
        end

        private

        def create_params
          update_params.merge(
            project_developer_id: current_user.account&.project_developer_id,
            language: current_user.account&.language
          )
        end

        def update_params
          params.permit(
            :name,
            :status,
            :country_id,
            :department_id,
            :municipality_id,
            :development_stage,
            :estimated_duration_in_months,
            :involved_project_developer_not_listed,
            :problem,
            :solution,
            :expected_impact,
            :looking_for_funding,
            :funding_plan,
            :category,
            :ticket_size,
            :received_funding,
            :received_funding_amount_usd,
            :received_funding_investor,
            :replicability,
            :sustainability,
            :progress_impact_tracking,
            :description,
            :relevant_links,
            target_groups: [],
            impact_areas: [],
            sdgs: [],
            instrument_types: [],
            project_images_attributes: %i[id file cover _destroy],
            involved_project_developer_ids: []
          ).tap { |r| r[:geometry] = params[:geometry].permit! if params[:geometry].present? }
        end

        def fetch_project
          @project = Project.friendly.find(params[:id])
        end

        def filter_params
          params.fetch(:filter, {}).permit :full_text
        end
      end
    end
  end
end
