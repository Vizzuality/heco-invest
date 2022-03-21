require "csv"

module Importers
  class Locations
    attr_accessor :country_name, :country, :departments_file_path, :municipalities_file_path, :regions_file_path

    def initialize(country_name, departments_file_path:, municipalities_file_path:, regions_file_path:)
      @country_name = country_name
      @departments_file_path = departments_file_path
      @municipalities_file_path = municipalities_file_path
      @regions_file_path = regions_file_path
    end

    def call
      ActiveRecord::Base.transaction do
        import_country!
        import_departments!
        import_municipalities!
        import_regions!
        add_regions_to_municipalities!
      end
    end

    private

    def import_country!
      @country = Location.find_or_create_by name_en: country_name, location_type: "country"
    end

    def import_departments!
      data = CSV.parse(File.read(departments_file_path), headers: true, col_sep: ";").map do |row|
        {name_en: row["name"], parent_id: country.id, location_type: "department"}
      end
      Location.insert_all data
    end

    def import_municipalities!
      data = CSV.parse(File.read(municipalities_file_path), headers: true, col_sep: ";").map do |row|
        {name_en: row["name"], parent_id: departments[row["department"]].first.id, location_type: "municipality"}
      end
      Location.insert_all data
    end

    def import_regions!
      data = CSV.foreach(regions_file_path, col_sep: ";").first[1..].map do |header|
        {name_en: header, parent_id: country.id, location_type: "region"}
      end
      Location.insert_all data
    end

    def add_regions_to_municipalities!
      data = CSV.parse(File.read(regions_file_path), headers: true, col_sep: ";").each_with_object([]) do |row, res|
        row.to_hash.except("municipality").each do |region_name, indicator|
          next unless indicator == "True"

          res << {location_id: municipalities[row["municipality"]].first.id,
                   member_id: regions[region_name].first.id}
        end
      end
      LocationMember.insert_all data
    end

    def departments
      @departments ||= minify Location.where(parent: country, location_type: "department")
    end

    def regions
      @regions ||= minify Location.where(parent: country, location_type: "region")
    end

    def municipalities
      @municipalities ||= minify Location.where(parent_id: departments.values.flatten.map(&:id),
        location_type: "municipality")
    end

    def minify(query)
      query.select(:id, :name_en).group_by(&:name_en)
    end
  end
end
