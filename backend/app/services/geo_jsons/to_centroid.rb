module GeoJsons
  class NoGeometry < StandardError; end

  class NoSupportedGeometry < StandardError; end

  class ToCentroid
    attr_accessor :geo_json

    def initialize(geo_json)
      @geo_json = geo_json
    end

    def call
      return if geo_json.blank?

      compute_centroid_for GeoJsons::ToGeometry.new(geo_json).call
    end

    private

    def compute_centroid_for(geometry)
      raise NoGeometry if geometry.blank?

      case geometry.geometry_type
      when RGeo::Feature::Point
        geometry
      when RGeo::Feature::Polygon
        geometry.centroid
      else
        raise NoSupportedGeometry
      end
    end
  end
end
