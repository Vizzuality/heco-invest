require "rails_helper"

RSpec.describe GeoJsons::ToGeometry do
  subject { described_class.new(RGeo::GeoJSON.decode(geo_json.to_json)) }

  describe "#call" do
    context "when geo_json is nil" do
      let(:geo_json) { nil }

      it "return nil value" do
        expect(subject.call).to be_nil
      end
    end

    context "when geo_json is simple geometry" do
      let(:geo_json) { {type: "Point", coordinates: [100.0, 0.0]} }

      it "returns correct geometry" do
        expect(subject.call).to eq(RGeo::GeoJSON.decode(geo_json.to_json))
      end
    end

    context "when geo_json is feature" do
      let(:geo_json) { {type: "Feature", geometry: {type: "Point", coordinates: [100.0, 0.0]}} }

      it "returns correct geometry" do
        expect(subject.call).to eq(RGeo::GeoJSON.decode(geo_json.to_json).geometry)
      end
    end

    context "when geo_json is list of features" do
      let(:geo_json) { {type: "FeatureCollection", features: [{type: "Feature", geometry: {type: "Point", coordinates: [100.0, 0.0]}}]} }

      it "returns correct geometry" do
        expect(subject.call).to eq(RGeo::GeoJSON.decode(geo_json.to_json).first.geometry)
      end
    end
  end
end
