PRIORITY_LANDSCAPE_TRANSLATIONS = {
  "Corazón Amazonía" => {name_en: "Amazon Heart", name_es: "Corazón Amazonía", name_pt: "Coração da Amazônia"},
  "Piedemonte Amazónico - Macizo" => {name_en: "Amazonian Piedmont Massif", name_es: "Piedemonte Amazónico - Macizo", name_pt: "Maciço Piedemonte Amazônico"},
  "Transición Orinoquía" => {name_en: "Orinoquía Transition", name_es: "Transición Orinoquía", name_pt: "Transição Orinoquía"},
  "Orinoquía" => {name_en: "Orinoquía", name_es: "Orinoquía", name_pt: "Orinoquía"}
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

namespace :priority_landscapes do
  desc "Translate existing priority landscapes"
  task translate: :environment do
    I18n.with_locale :es do
      Location.priority_landscape.each do |landscape|
        landscape.update! PRIORITY_LANDSCAPE_TRANSLATIONS[landscape.name] if PRIORITY_LANDSCAPE_TRANSLATIONS.key? landscape.name
      end
    end
  end

  desc "Hide extra priority landscapes"
  task hide: :environment do
    I18n.with_locale :es do
      Location.priority_landscape.each do |landscape|
        landscape.update! visible: false unless PRIORITY_LANDSCAPE_TRANSLATIONS.key? landscape.name
      end
    end
  end

  desc "Add codes to priority landscapes"
  task add_codes: :environment do
    I18n.with_locale :es do
      Location.priority_landscape.each do |landscape|
        landscape.update! code: PRIORITY_LANDSCAPE_CODES[landscape.name] if PRIORITY_LANDSCAPE_CODES.key? landscape.name
      end
    end
  end
end
