module API
  module V1
    module Accounts
      class ProjectsController < BaseController
        skip_before_action :require_json!, only: %i[create]
        before_action :require_project_developer!

        def create
          project = Project.create!(
            project_params.merge(
              project_developer_id: current_user.account.project_developer.id,
              language: current_user.account.language
            )
          )
          render json: ProjectSerializer.new(
            project,
            include: included_relationships(parameters: params.fetch(:project_params, params)),
            params: {current_user: current_user}
          ).serializable_hash
        end

        private

        def project_params
          params
            .fetch(:project_params, params)
            .permit(
              :name,
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
              :geometry,
              geometry: {},
              involved_project_developer_ids: [],
              target_groups: [],
              impact_areas: [],
              sdgs: [],
              instrument_types: [],
              project_images_attributes: %i[id file cover _destroy]
            )
        end
      end
    end
  end
end
