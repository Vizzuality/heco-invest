module API
  module V1
    class ProjectSerializer
      include JSONAPI::Serializer

      attributes :name,
        :slug,
        :description,
        :development_stage,
        :estimated_duration_in_months,
        :target_groups,
        :impact_areas,
        :category,
        :sdgs,
        :involved_project_developer_not_listed,
        :problem,
        :solution,
        :expected_impact,
        :looking_for_funding,
        :ticket_size,
        :instrument_types,
        :sustainability,
        :replicability,
        :progress_impact_tracking,
        :received_funding,
        :received_funding_amount_usd,
        :received_funding_investor,
        :relevant_links,
        :language

      belongs_to :project_developer
      has_many :involved_project_developers, serializer: ProjectDeveloperSerializer
      has_many :project_images
    end
  end
end
