module Importers
  module GeoJsons
    class Basins < Base
      private

      def attributes_of_record_for(feature)
        {
          name: feature.properties["sub_name"],
          code: feature.properties["sub_bas"].to_s,
          location_type: :basin,
          parent: find_correct_basin_category_for(feature),
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

      def find_correct_record_for(feature)
        data.find { |record| record.code == feature.properties["sub_bas"].to_s }
      end

      def find_correct_basin_category_for(feature)
        basin_categories.find { |record| record.code == feature.properties["maj_bas"].to_s } || create_basins_category_from(feature)
      end

      def create_basins_category_from(feature)
        new_record = Location.create! location_type: :basins_category, parent_id: country.id,
          name: feature.properties["maj_name"], code: feature.properties["maj_bas"].to_s
        basin_categories << new_record
        new_record
      end

      def data
        @data ||= Location.where(parent_id: basin_categories.pluck(:id), location_type: :basin).to_a
      end

      def basin_categories
        @basin_categories ||= Location.where(parent_id: country.id, location_type: :basins_category).to_a
      end
    end
  end
end
