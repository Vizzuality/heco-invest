require "csv"

module Importers
  class Locations
    attr_accessor :state_name, :state, :departments_file_path, :municipalities_file_path

    def initialize(state_name, departments_file_path:, municipalities_file_path:)
      @state_name = state_name
      @departments_file_path = departments_file_path
      @municipalities_file_path = municipalities_file_path
    end

    def call
      ActiveRecord::Base.transaction do
        import_state!
        import_departments!
        import_municipalities!
      end
    end

    private

    def import_state!
      @state = Location.find_or_create_by name_en: state_name, location_type: "state"
    end

    def import_departments!
      data = CSV.parse(File.read(departments_file_path), headers: true, col_sep: ";").map do |row|
        {name_en: row["name"], parent_id: state.id, location_type: "department"}
      end
      Location.insert_all data
    end

    def import_municipalities!
      data = CSV.parse(File.read(municipalities_file_path), headers: true, col_sep: ";").map do |row|
        {name_en: row["name"], parent_id: departments[row["department"]].first.id, location_type: "municipality"}
      end
      Location.insert_all data
    end

    def departments
      @departments ||= Location.where(parent: state).select(:id, :name_en).group_by(&:name_en)
    end
  end
end
