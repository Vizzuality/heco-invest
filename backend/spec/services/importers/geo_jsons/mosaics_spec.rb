require "rails_helper"

RSpec.describe Importers::GeoJsons::Mosaics do
  subject { described_class.new(path, country) }

  let(:country) { create :location, location_type: :country }

  describe "#call" do
    context "when files does not exists at provided path" do
      let(:path) { "WRONG_PATH" }

      before { allow(subject).to receive(:puts).with("GeoJSON at #{path} with location data was not found. Skipping location import!") }

      it "return nil" do
        expect(subject.call).to be_nil
      end
    end

    context "when path with proper geojson is provided" do
      let(:path) { Rails.root.join("spec/fixtures/files/dummy_mosaics.geojson") }
      let(:priority_landscapes) { Location.where location_type: :priority_landscape, parent: country }

      before { subject.call }

      it "creates correct priority_landscapes" do
        expect(priority_landscapes.count).to eq(2)
        expect(priority_landscapes.pluck(:name_es)).to include("Cordillera Oriental")
        expect(priority_landscapes.pluck(:name_es)).to include("Piedemonte Amazónico - Macizo")
      end

      it "assigns correct attributes to first priority landscape" do
        location = priority_landscapes.find_by name_es: "Cordillera Oriental"
        expect(location.name_en).to eq("Eastern Mountain")
        expect(location.visible).to be_truthy
        expect(location.code).to eq(Importers::GeoJsons::Mosaics::PRIORITY_LANDSCAPE_CODES["Cordillera Oriental"])
      end

      it "assigns correct attributes to second priority landscape" do
        location = priority_landscapes.find_by name_es: "Piedemonte Amazónico - Macizo"
        expect(location.name_en).to eq("Amazonian Piedmont Massif")
        expect(location.visible).to be_truthy
        expect(location.code).to eq(Importers::GeoJsons::Mosaics::PRIORITY_LANDSCAPE_CODES["Piedemonte Amazónico - Macizo"])
      end

      it "creates geometries records" do
        expect(LocationGeometry.count).to eq(priority_landscapes.count)
        expect(priority_landscapes.find_by(name_es: "Piedemonte Amazónico - Macizo").location_geometry.geometry)
          .to eq(RGeo::GeoJSON.decode({type: "Polygon", coordinates: [[[105.0, 0.0], [106.0, 0.0], [106.0, 1.0], [105.0, 1.0], [105.0, 0.0]]]}.to_json))
      end

      it "assign all impact related attributes" do
        expect(priority_landscapes.first.biodiversity).not_to be_nil
        expect(priority_landscapes.first.biodiversity_demand).not_to be_nil
        expect(priority_landscapes.first.climate).not_to be_nil
        expect(priority_landscapes.first.climate_demand).not_to be_nil
        expect(priority_landscapes.first.community).not_to be_nil
        expect(priority_landscapes.first.community_demand).not_to be_nil
        expect(priority_landscapes.first.water).not_to be_nil
        expect(priority_landscapes.first.water_demand).not_to be_nil
      end
    end
  end
end
