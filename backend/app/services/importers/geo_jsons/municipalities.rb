module Importers
  module GeoJsons
    class Municipalities < Base
      private

      def attributes_of_record_for(feature)
        {
          name_en: titleize_of(feature.properties["nombre_ent"]),
          code: feature.properties["cod_munici"],
          location_type: "municipality",
          parent_id: find_correct_department_for(feature).id,
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

      def find_correct_department_for(feature)
        departments[titleize_of(feature.properties["departamen"])]&.first || create_department_from(feature)
      end

      def create_department_from(feature)
        new_record = Location.create! location_type: "department", parent_id: country.id,
          name: titleize_of(feature.properties["departamen"]), code: feature.properties["cod_depart"]
        departments[titleize_of(feature.properties["departamen"])] = [new_record]
        new_record
      end

      def departments
        @departments ||= Location.where(parent_id: country.id, location_type: :department).group_by(&:name)
      end
    end
  end
end
