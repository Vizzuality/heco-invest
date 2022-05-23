module Importers
  module GeoJsons
    class Basins < Base
      private

      def attributes_of_record_for(feature)
        {
          name_en: feature.properties["sub_name"],
          code: feature.properties["sub_bas"].to_s,
          location_type: "basin",
          parent_id: find_correct_basins_category_for(feature).id,
          geometry: feature.geometry,
          biodiversity: feature.properties["biodiversity"],
          biodiversity_demand: feature.properties["biodiversity_demand"],
          climate: feature.properties["climate"],
          climate_demand: feature.properties["climate_demand"],
          community: feature.properties["community"],
          community_demand: feature.properties["community_demand"],
          water: feature.properties["water"],
          water_demand: feature.properties["water_demand"]
        }
      end

      def find_correct_basins_category_for(feature)
        basins_categories[feature.properties["maj_bas"].to_s]&.first || create_basins_category_from(feature)
      end

      def create_basins_category_from(feature)
        new_record = Location.create! location_type: "basins_category", parent_id: country.id,
          name: feature.properties["maj_name"], code: feature.properties["maj_bas"].to_s
        basins_categories[feature.properties["maj_bas"].to_s] = [new_record]
        new_record
      end

      def basins_categories
        @basin_categories ||= Location.where(parent_id: country.id, location_type: :basins_category).group_by(&:code)
      end
    end
  end
end
