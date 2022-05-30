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

      compute_centroid_for unwrap_features_of(geo_json)
    end

    private

    def unwrap_features_of(geo_json)
      return unwrap_features_of(geo_json.first) if geo_json.is_a? RGeo::GeoJSON::FeatureCollection # take first feature
      return geo_json.geometry if geo_json.is_a? RGeo::GeoJSON::Feature

      geo_json
    end

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
