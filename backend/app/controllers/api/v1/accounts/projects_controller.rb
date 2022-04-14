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
          render json: ProjectSerializer.new(project).serializable_hash
        end

        # def update
        #   current_user.account.update! account_params.except(:language)
        #   current_user.account.project_developer.update! project_developer_params.except(:language)
        #   render json: ProjectDeveloperSerializer.new(current_user.account.project_developer).serializable_hash
        # end

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
              categories: [],
              target_groups: [],
              impact_areas: [],
              sdgs: [],
              instrument_types: []
            )
        end
      end
    end
  end
end
