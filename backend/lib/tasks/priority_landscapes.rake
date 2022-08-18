PRIORITY_LANDSCAPES = {
  "Corazón Amazonía" => {name_en: "Amazon Heart", name_es: "Corazón Amazonía", name_pt: "Coração da Amazônia"},
  "Piedemonte Amazónico - Macizo" => {name_en: "Amazonian Piedmont Massif", name_es: "Piedemonte Amazónico - Macizo", name_pt: "Maciço Piedemonte Amazônico"},
  "Transición Orinoquía" => {name_en: "Orinoquía Transition", name_es: "Transición Orinoquía", name_pt: "Transição Orinoquía"},
  "Orinoquía" => {name_en: "Orinoquía", name_es: "Orinoquía", name_pt: "Orinoquía"}
}

namespace :priority_landscapes do
  desc "Translate existing priority landscapes"
  task translate: :environment do
    I18n.with_locale :es do
      Location.priority_landscape.each do |landscape|
        landscape.update! PRIORITY_LANDSCAPES[landscape.name] if PRIORITY_LANDSCAPES.key? landscape.name
      end
    end
  end

  desc "Hide extra priority landscapes"
  task hide: :environment do
    I18n.with_locale :es do
      Location.priority_landscape.each do |landscape|
        landscape.update! visible: false unless PRIORITY_LANDSCAPES.key? landscape.name
      end
    end
  end
end
