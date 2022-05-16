namespace :import_geojsons do
  desc "Seeding database with geojson data for Colombia country"
  task colombia: :environment do
    puts "Importing Colombia from GeoJSON"
    Importers::GeoJsons::Countries.new(Rails.root.join("db/seeds/files/colombia.geojson"), nil).call

    country = Location.find_by! location_type: :country, name_en: "Colombia"
    puts "Importing Mosaics from GeoJSON"
    Importers::GeoJsons::Mosaics.new(Rails.root.join("db/seeds/files/mosaics.geojson"), country).call
    puts "Importing Municipalities from GeoJSON"
    Importers::GeoJsons::Municipalities.new(Rails.root.join("db/seeds/files/municipalities.geojson"), country).call
    puts "Importing Basins from GeoJSON"
    Importers::GeoJsons::Basins.new(Rails.root.join("db/seeds/files/basins.geojson"), country).call
  end
end
