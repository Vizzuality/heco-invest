module Klab
  class BuildContextString
    class UnknownImpactLevel < StandardError; end

    attr_accessor :project, :impact_level

    MAX_GRID_RESOLUTION = 256

    def initialize(project, impact_level)
      @project = project
      @impact_level = impact_level
    end

    def call
      geometry = find_geometry
      return if geometry.blank?

      box = bounding_box_for geometry
      "τ0(1){ttype=LOGICAL,period=#{current_time_period},tscope=1.0,tunit=YEAR}S2(#{resolution_grid_for(box)})" \
      "{bbox=[#{box.min_x} #{box.max_x} #{box.min_y} #{box.max_y}],shape=#{wkb_for(geometry)},proj=EPSG:4326}"
    end

    private

    def wkb_for(geometry)
      RGeo::WKRep::WKBGenerator.new(hex_format: true, type_format: :ewkb).generate(geometry).upcase
    end

    def bounding_box_for(geometry)
      RGeo::Cartesian::BoundingBox.create_from_geometry geometry
    end

    def resolution_grid_for(box)
      return "1,1" if (box.max_x - box.min_x).zero? || (box.max_y - box.min_y).zero?

      ratio = (box.max_y - box.min_y) / (box.max_x - box.min_x)
      "#{MAX_GRID_RESOLUTION},#{(MAX_GRID_RESOLUTION * ratio).round}"
    end

    def current_time_period
      time_start = ((Time.now - 1.year).beginning_of_year + 1.hour).to_datetime.strftime "%Q"
      time_end = (Time.now.beginning_of_year + 1.hour).to_datetime.strftime "%Q"
      "[#{time_start} #{time_end}]"
    end

    def find_geometry
      case impact_level
      when "project"
        RGeo::GeoJSON.decode project.geometry
      when "municipality"
        LocationGeometry.of_type(:municipality).intersection_with(project.centroid).first&.geometry
      when "hydrobasin"
        LocationGeometry.of_type(:basin).intersection_with(project.centroid).first&.geometry
      when "priority_landscape"
        LocationGeometry.of_type(:priority_landscape).intersection_with(project.centroid).first&.geometry
      else
        raise UnknownImpactLevel
      end
    end
  end
end
