module Importers
  module GeoJsons
    class Mosaics < Base
      private

      def attributes_of_record_for(feature)
        {
          name: feature.properties["mosaico"],
          location_type: :region,
          parent_id: country.id,
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
        data.find { |record| record.name == feature.properties["mosaico"] }
      end

      def data
        @data ||= Location.where(parent_id: country.id, location_type: :region).to_a
      end
    end
  end
end
