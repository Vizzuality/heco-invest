require "rails_helper"

RSpec.describe Importers::GeoJsons::Countries do
  subject { described_class.new(path, nil) }

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
      let(:path) { Rails.root.join("spec/fixtures/files/dummy_colombia.geojson") }
<<<<<<< HEAD
      let(:country) { Location.find_by(name_en: "Colombia", location_type: :country) }
=======
>>>>>>> feat: Services for importing data from geojsons

      before { subject.call }

      it "creates correct country" do
<<<<<<< HEAD
        expect(country).not_to be_nil
      end

      it "creates geometries records" do
        expect(country.location_geometry.geometry)
          .to eq(RGeo::GeoJSON.decode({type: "Polygon", coordinates: [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]]]}.to_json))
=======
        expect(Location.where(name_en: "Colombia", location_type: :country)).to be_exists
>>>>>>> feat: Services for importing data from geojsons
      end
    end
  end
end
