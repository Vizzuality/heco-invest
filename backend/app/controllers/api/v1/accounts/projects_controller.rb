module API
  module V1
    module Accounts
      class ProjectsController < BaseController
        before_action :require_project_developer!
        before_action :fetch_project, only: [:update]
        load_and_authorize_resource

        def index
          projects = @projects
            .where(project_developer_id: current_user.account.project_developer.id)
            .includes(:project_developer, :involved_project_developers, project_images: {file_attachment: :blob})
          projects = API::Filterer.new(projects, filter_params.to_h).call
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

        private

        def create_params
          update_params.merge(
            project_developer_id: current_user.account.project_developer.id,
            language: current_user.account.language
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
            involved_project_developer_ids: [],
            target_groups: [],
            impact_areas: [],
            sdgs: [],
            instrument_types: [],
            project_images_attributes: %i[id file cover _destroy]
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
