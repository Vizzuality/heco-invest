module Importers
  module GeoJsons
    class Countries < Base
      private

      def attributes_of_record_for(feature)
        {
          name_en: titleize_of(feature.properties["nombre_ent"]),
          location_type: "country",
          geometry: feature.geometry
        }
      end
    end
  end
end
