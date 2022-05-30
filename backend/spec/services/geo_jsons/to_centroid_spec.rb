require "rails_helper"

RSpec.describe GeoJsons::ToCentroid do
  subject { described_class.new(RGeo::GeoJSON.decode(geo_json.to_json)) }

  describe "#call" do
    context "when geo_json is nil" do
      let(:geo_json) { nil }

      it "return nil value" do
        expect(subject.call).to be_nil
      end
    end

    context "when geo_json is point" do
      let(:geo_json) { {type: "Point", coordinates: [100.0, 0.0]} }

      it "returns correct centroid" do
        expect(subject.call.x).to eq(100.0)
        expect(subject.call.y).to eq(0.0)
      end
    end

    context "when geo_json is polygon" do
      let(:geo_json) { {type: "Polygon", coordinates: [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]]]} }

      it "returns correct centroid" do
        expect(subject.call.x).to eq(100.5)
        expect(subject.call.y).to eq(0.5)
      end
    end

    context "when geo_json is feature" do
      let(:geo_json) { {type: "Feature", geometry: {type: "Point", coordinates: [100.0, 0.0]}} }

      it "returns correct centroid" do
        expect(subject.call.x).to eq(100.0)
        expect(subject.call.y).to eq(0.0)
      end
    end

    context "when geo_json is list of features" do
      let(:geo_json) { {type: "FeatureCollection", features: [{type: "Feature", geometry: {type: "Point", coordinates: [100.0, 0.0]}}]} }

      it "returns correct centroid" do
        expect(subject.call.x).to eq(100.0)
        expect(subject.call.y).to eq(0.0)
      end
    end

    context "when geometry inside geo_json is empty" do
      let(:geo_json) { {type: "FeatureCollection", features: []} }

      it "raises appropriate error" do
        expect { subject.call }.to raise_error(GeoJsons::NoGeometry)
      end
    end

    context "when geometry inside geo_json is not supported" do
      let(:geo_json) { {type: "LineString", coordinates: [[100.0, 0.0], [101.0, 1.0]]} }

      it "raises appropriate error" do
        expect { subject.call }.to raise_error(GeoJsons::NoSupportedGeometry)
      end
    end
  end
end
