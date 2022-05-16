namespace :import_geojsons do
  desc "Seeding database with geojson data for Colombia country"
  task colombia: :environment do
    Importers::GeoJsons::Countries.new(Rails.root.join("db/seeds/files/colombia.geojson"), nil).call

    country = Location.find_by! location_type: :country, name_en: "Colombia"
    Importers::GeoJsons::Mosaics.new(Rails.root.join("db/seeds/files/mosaics.geojson"), country).call
    Importers::GeoJsons::Municipalities.new(Rails.root.join("db/seeds/files/municipalities.geojson"), country).call
    Importers::GeoJsons::Basins.new(Rails.root.join("db/seeds/files/basins.geojson"), country).call
  end
end
