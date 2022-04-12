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
        :categories,
        :sdgs,
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
    end
  end
end
