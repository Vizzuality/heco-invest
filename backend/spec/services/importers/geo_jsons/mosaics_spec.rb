require "rails_helper"

RSpec.describe Importers::GeoJsons::Mosaics do
  subject { described_class.new(path, country) }

  let(:country) { create :location, location_type: :country }

  describe "#call" do
    context "when files does not exists at provided path" do
      let(:path) { "WRONG_PATH" }

      it "return nil" do
        expect(subject.call).to be_nil
      end
    end

    context "when path with proper geojson is provided" do
      let(:path) { Rails.root.join("spec/fixtures/files/dummy_mosaics.geojson") }
      let(:mosaics) { Location.where location_type: :region, parent: country }

      before { subject.call }

      it "creates correct mosaics" do
        expect(mosaics.count).to eq(2)
        expect(mosaics.pluck(:name_en)).to include("Cordillera Oriental")
        expect(mosaics.pluck(:name_en)).to include("Piedemonte Amazónico - Macizo")
      end

      it "assign all impact related attributes" do
        expect(mosaics.first.geometry).not_to be_nil
        expect(mosaics.first.biodiversity).not_to be_nil
        expect(mosaics.first.biodiversity_demand).not_to be_nil
        expect(mosaics.first.climate).not_to be_nil
        expect(mosaics.first.climate_demand).not_to be_nil
        expect(mosaics.first.community).not_to be_nil
        expect(mosaics.first.community_demand).not_to be_nil
        expect(mosaics.first.water).not_to be_nil
        expect(mosaics.first.water_demand).not_to be_nil
      end
    end
  end
end
