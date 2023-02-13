namespace :priority_landscapes do
  desc "Translate existing priority landscapes"
  task translate: :environment do
    I18n.with_locale :es do
      Location.priority_landscape.each do |landscape|
        if Importers::GeoJsons::Mosaics::PRIORITY_LANDSCAPE_TRANSLATIONS.key? landscape.name
          landscape.update! Importers::GeoJsons::Mosaics::PRIORITY_LANDSCAPE_TRANSLATIONS[landscape.name]
        end
      end
    end
  end

  desc "Hide extra priority landscapes"
  task hide: :environment do
    I18n.with_locale :es do
      Location.priority_landscape.each do |landscape|
        landscape.update! visible: Importers::GeoJsons::Mosaics::PRIORITY_LANDSCAPE_TRANSLATIONS.key?(landscape.name)
      end
    end
  end

  desc "Add codes to priority landscapes"
  task add_codes: :environment do
    I18n.with_locale :es do
      Location.priority_landscape.each do |landscape|
        if Importers::GeoJsons::Mosaics::PRIORITY_LANDSCAPE_CODES.key? landscape.name
          landscape.update! code: Importers::GeoJsons::Mosaics::PRIORITY_LANDSCAPE_CODES[landscape.name]
        end
      end
    end
  end

  task fix_geometries: :environment do
    path = Rails.root.join "db/seeds/files/mosaics_corrected.geojson"

    Location.transaction do
      I18n.with_locale :es do
        locations = Location.includes(:location_geometry).priority_landscape.group_by(&:name)
        RGeo::GeoJSON.decode(File.read(path)).to_a.map do |feature|
          puts "Updating geometry of #{feature.properties["mosaico"]}"
          locations[feature.properties["mosaico"]].first.location_geometry.update! geometry: feature.geometry
        end
      end
    end
  end
end
