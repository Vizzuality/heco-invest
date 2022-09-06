module API
  module V1
    class ProjectSerializer < BaseSerializer
      attributes :name,
        :status,
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
        :funding_plan,
        :sustainability,
        :replicability,
        :progress_impact_tracking,
        :received_funding,
        :received_funding_amount_usd,
        :received_funding_investor,
        :relevant_links,
        :language,
        :account_language,
        :geometry,
        :verified,
        :created_at,
        :municipality_biodiversity_impact,
        :municipality_climate_impact,
        :municipality_water_impact,
        :municipality_community_impact,
        :municipality_total_impact,
        :hydrobasin_biodiversity_impact,
        :hydrobasin_climate_impact,
        :hydrobasin_water_impact,
        :hydrobasin_community_impact,
        :hydrobasin_total_impact,
        :priority_landscape_biodiversity_impact,
        :priority_landscape_climate_impact,
        :priority_landscape_water_impact,
        :priority_landscape_community_impact,
        :priority_landscape_total_impact,
        :impact_calculated
      attribute :trusted, &:verified

      belongs_to :project_developer
      belongs_to :country, serializer: LocationSerializer
      belongs_to :municipality, serializer: LocationSerializer
      belongs_to :department, serializer: LocationSerializer
      belongs_to :priority_landscape, serializer: LocationSerializer
      has_many :involved_project_developers, serializer: ProjectDeveloperSerializer
      has_many :project_images

      attribute :latitude do |object, _params|
        object.centroid&.y
      end

      attribute :longitude do |object, _params|
        object.centroid&.x
      end

      attribute :favourite do |object, params|
        next if params[:current_user].blank?

        object.id.in? params[:current_user].project_ids
      end
    end
  end
end
