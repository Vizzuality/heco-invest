module Importers
  module GeoJsons
    class Mosaics < Base
      PRIORITY_LANDSCAPE_TRANSLATIONS = {
        "Corazón Amazonía" => {name_en: "Amazon Heart", name_es: "Corazón Amazonía", name_pt: "Coração da Amazônia"},
        "Piedemonte Amazónico - Macizo" => {name_en: "Amazonian Piedmont Massif", name_es: "Piedemonte Amazónico - Macizo", name_pt: "Maciço Piedemonte Amazônico"},
        "Transición Orinoquía" => {name_en: "Orinoquía Transition", name_es: "Transición Orinoquía", name_pt: "Transição Orinoquía"},
        "Orinoquía" => {name_en: "Orinoquía", name_es: "Orinoquía", name_pt: "Orinoquía"},
        "Cordillera Oriental" => {name_en: "Eastern Mountain", name_es: "Cordillera Oriental", name_pt: "Cordilheira Oriental"},
        "Cordillera Central" => {name_en: "Central Mountain Range", name_es: "Cordillera Central", name_pt: "Cordilheira Central"},
        "Pacífico - Marino Costero" => {name_en: "Pacific - Coastal Marine", name_es: "Pacífico - Marino Costero", name_pt: "Pacífico - Marinho Costeiro"},
        "Caribe" => {name_en: "Caribbean", name_es: "Caribe", name_pt: "Caribe"},
        "Transición Pacífico - Caribe" => {name_en: "Pacific - Caribbean Transition", name_es: "Transición Pacífico - Caribe", name_pt: "Transição Pacífico - Caribe"}
      }
      PRIORITY_LANDSCAPE_CODES = {
        "Corazón Amazonía" => "priority-landscape-amazon-heart",
        "Piedemonte Amazónico - Macizo" => "priority-landscape-amazonian-piedmont-massif",
        "Transición Orinoquía" => "priority-landscape-orinoquia-transition",
        "Orinoquía" => "priority-landscape-orinoquia",
        "Cordillera Oriental" => "priority-landscape-cordillera-oriental",
        "Cordillera Central" => "priority-landscape-cordillera-central",
        "Pacífico - Marino Costero" => "priority-landscape-pacifico-marino-costero",
        "Caribe" => "priority-landscape-caribe",
        "Transición Pacífico - Caribe" => "priority-landscape-transicion-pacifico-caribe"
      }

      private

      def attributes_of_record_for(feature)
        {
          name_en: PRIORITY_LANDSCAPE_TRANSLATIONS.dig(feature.properties["mosaico"], :name_en).presence || feature.properties["mosaico"],
          name_es: feature.properties["mosaico"],
          name_pt: PRIORITY_LANDSCAPE_TRANSLATIONS.dig(feature.properties["mosaico"], :name_pt),
          location_type: "priority_landscape",
          parent_id: country.id,
          geometry: feature.geometry,
          visible: PRIORITY_LANDSCAPE_TRANSLATIONS.key?(feature.properties["mosaico"]),
          code: PRIORITY_LANDSCAPE_CODES[feature.properties["mosaico"]],
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
    end
  end
end
