module Importers
  module GeoJsons
    class Countries < Base
      private

      def attributes_of_record_for(feature)
        {
          name: titleize_of(feature.properties["nombre_ent"]),
          location_type: :country,
          geometry: feature.geometry
        }
      end

      def find_correct_record_for(feature)
        data.find { |record| record.name == titleize_of(feature.properties["nombre_ent"]) }
      end

      def data
        @data ||= Location.where(location_type: :country).to_a
      end
    end
  end
end
