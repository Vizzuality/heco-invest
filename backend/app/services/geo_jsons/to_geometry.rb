module GeoJsons
  class ToGeometry
    attr_accessor :geo_json

    def initialize(geo_json)
      @geo_json = geo_json
    end

    def call
      unwrap_features_of geo_json
    end

    private

    def unwrap_features_of(geo_json)
      return unwrap_features_of(geo_json.first) if geo_json.is_a? RGeo::GeoJSON::FeatureCollection # take first feature
      return geo_json.geometry if geo_json.is_a? RGeo::GeoJSON::Feature

      geo_json
    end
  end
end
