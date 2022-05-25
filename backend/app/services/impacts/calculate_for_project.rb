module Impacts
  class CalculateForProject
    attr_accessor :project, :impacts

    CALCULATION_SETUP = {
      "biodiversity" => {
        "conservation" => {less_then: 0.4},
        "restoration" => {more_then: 0.6},
        "pollutants-reduction" => {}
      },
      "climate" => {
        "carbon-emission-reduction" => {more_then: 0.6},
        "energy-efficiency" => {},
        "renewable-energy" => {},
        "carbon-storage-or-sequestration" => {less_then: 0.4}
      },
      "water" => {
        "water-capacity-or-efficiency" => {more_then: 0.6},
        "hydrometerological-risk-reduction" => {},
        "sustainable-food" => {}
      },
      "community" => {
        "gender-equality-jobs" => {},
        "indigenous-or-ethic-jobs" => {},
        "community-empowerment" => {}
      }
    }

    def initialize(project)
      @project = project
      @impacts = {}
    end

    def call
      return if project.centroid.blank?

      calculate_impacts
      store_impacts!
    end

    private

    def calculate_impacts
      assign_impacts_for location_intersection_for(:municipality), impact_type: :municipality
      assign_impacts_for location_intersection_for(:basin), impact_type: :hydrobasin
      assign_impacts_for location_intersection_for(:region), impact_type: :priority_landscape
    end

    def store_impacts!
      project.assign_attributes impacts
      project.save!
    end

    def assign_impacts_for(location, impact_type:)
      return if location.blank?

      values = CALCULATION_SETUP.map do |impact, impact_areas|
        demand = location.public_send "#{impact}_demand"
        impact_value_for(impact_areas, demand).tap { |value| impacts["#{impact_type}_#{impact}_impact"] = value }
      end
      impacts["#{impact_type}_total_impact"] = values.sum / values.size
    end

    def impact_value_for(impact_areas, demand)
      return 0 if (project.impact_areas & impact_areas.keys) == impact_areas.keys || demand.nil? # return zero if all impact areas of appropriate type are selected

      supply = supply_value_for impact_areas, demand
      supply.zero? ? 0 : -((supply - demand)**2) + 1
    end

    def supply_value_for(impact_areas, demand)
      result = impact_areas.map do |impact_area, options|
        next 0.0 unless impact_area.in? project.impact_areas

        less_then = options[:less_then] || 100
        more_then = options[:more_then] || -100
        less_then > demand && more_then < demand ? 1.0 : 0.0
      end
      (result.sum / result.size)
    end

    def location_intersection_for(location_type)
      LocationGeometry.joins(:location).where(locations: {location_type: location_type})
        .intersection_with(project.centroid).first&.location
    end
  end
end
