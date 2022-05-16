require "rails_helper"

RSpec.describe Importers::GeoJsons::Municipalities do
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
      let(:path) { Rails.root.join("spec/fixtures/files/dummy_municipalities.geojson") }
      let(:departments) { Location.where location_type: :department, parent: country }
      let(:municipalities) { Location.where location_type: :municipality, parent: departments.first }

      before { subject.call }

      it "creates correct departments" do
        expect(departments.count).to eq(1)
        expect(departments.pluck(:name_en)).to include("Antioquia")
      end

      it "creates correct municipalities" do
        expect(municipalities.count).to eq(2)
        expect(municipalities.pluck(:name_en)).to include("Medellín")
        expect(municipalities.pluck(:name_en)).to include("Abejorral")
      end

      it "assign all impact related attributes" do
        expect(municipalities.first.geometry).not_to be_nil
        expect(municipalities.first.biodiversity).not_to be_nil
        expect(municipalities.first.biodiversity_demand).not_to be_nil
        expect(municipalities.first.climate).not_to be_nil
        expect(municipalities.first.climate_demand).not_to be_nil
        expect(municipalities.first.community).not_to be_nil
        expect(municipalities.first.community_demand).not_to be_nil
        expect(municipalities.first.water).not_to be_nil
        expect(municipalities.first.water_demand).not_to be_nil
      end
    end
  end
end
