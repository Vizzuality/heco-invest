FactoryBot.define do
  factory :location_geometry do
    location
    geometry { RGeo::GeoJSON.decode({type: "Polygon", coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1]]]}.to_json) }
  end
end
