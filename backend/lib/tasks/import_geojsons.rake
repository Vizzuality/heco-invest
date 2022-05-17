namespace :import_geojsons do
  desc "Seeding database with geojson data for Colombia country"
  task colombia: :environment do
    ######### RUN IMPORTS ##########
    puts "Importing Colombia from GeoJSON"
    Importers::GeoJsons::Countries.new(Rails.root.join("db/seeds/files/colombia.geojson"), nil).call
    country = Location.find_by! location_type: :country, name_en: "Colombia"
    puts "Importing Mosaics from GeoJSON"
    Importers::GeoJsons::Mosaics.new(Rails.root.join("db/seeds/files/mosaics.geojson"), country).call
    puts "Importing Municipalities from GeoJSON"
    Importers::GeoJsons::Municipalities.new(Rails.root.join("db/seeds/files/municipalities.geojson"), country).call
    puts "Importing Basins from GeoJSON"
    Importers::GeoJsons::Basins.new(Rails.root.join("db/seeds/files/basins.geojson"), country).call

    ######### RUN DELETION OF RECORDS WITHOUT GEOMETRIES ##########
    puts "Deleting mosaics without geometries"
    Location.where(parent_id: country.id, location_type: :region, geometry: nil).destroy_all
    puts "Deleting municipalities without geometries"
    Location.where(parent: Location.where(parent_id: country.id, location_type: :department))
      .where(location_type: :municipality, geometry: nil).destroy_all
    puts "Deleting departments without municipalities"
    Location.where(parent_id: country.id, location_type: :department)
      .where.not(id: Location.where(location_type: :municipality).pluck(:parent_id)).destroy_all
    puts "Deleting basins without geometries"
    Location.where(parent: Location.where(parent_id: country.id, location_type: :basins_category))
      .where(location_type: :basin, geometry: nil).destroy_all
    puts "Deleting basins categories without basins"
    Location.where(parent_id: country.id, location_type: :basins_category)
      .where.not(id: Location.where(location_type: :basin).pluck(:parent_id)).destroy_all
  end
end
