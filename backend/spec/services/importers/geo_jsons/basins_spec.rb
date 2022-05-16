require "rails_helper"

RSpec.describe Importers::GeoJsons::Basins do
  subject { described_class.new(path, country) }

  let(:country) { create :location, location_type: :country }

  describe "#call" do
    context "when files does not exists at provided path" do
      let(:path) { "WRONG_PATH" }

<<<<<<< HEAD
      before { allow(subject).to receive(:puts).with("GeoJSON at #{path} with location data was not found. Skipping location import!") }

=======
>>>>>>> feat: Services for importing data from geojsons
      it "return nil" do
        expect(subject.call).to be_nil
      end
    end

    context "when path with proper geojson is provided" do
      let(:path) { Rails.root.join("spec/fixtures/files/dummy_basins.geojson") }
      let(:basins_categories) { Location.where location_type: :basins_category, parent: country }
      let(:basins) { Location.where location_type: :basin, parent: basins_categories.first }

      before { subject.call }

      it "creates correct basins categories" do
        expect(basins_categories.count).to eq(1)
        expect(basins_categories.pluck(:name_en)).to include("Caribbean Coast")
      end

      it "creates correct basins" do
        expect(basins.count).to eq(2)
        expect(basins.pluck(:name_en)).to include("Archipielago de San Blas Coast")
        expect(basins.pluck(:name_en)).to include("Guasare")
      end

<<<<<<< HEAD
      it "creates geometries records" do
        expect(LocationGeometry.count).to eq(basins.count)
        expect(basins.find_by(name_en: "Guasare").location_geometry.geometry)
          .to eq(RGeo::GeoJSON.decode({type: "MultiPolygon", coordinates: [[[105.0, 0.0], [106.0, 0.0], [106.0, 1.0], [105.0, 1.0], [105.0, 0.0]]]}.to_json))
      end

      it "assign all impact related attributes" do
=======
      it "assign all impact related attributes" do
        expect(basins.first.geometry).not_to be_nil
>>>>>>> feat: Services for importing data from geojsons
        expect(basins.first.biodiversity).not_to be_nil
        expect(basins.first.biodiversity_demand).not_to be_nil
        expect(basins.first.climate).not_to be_nil
        expect(basins.first.climate_demand).not_to be_nil
        expect(basins.first.community).not_to be_nil
        expect(basins.first.community_demand).not_to be_nil
        expect(basins.first.water).not_to be_nil
        expect(basins.first.water_demand).not_to be_nil
      end
    end
  end
end
