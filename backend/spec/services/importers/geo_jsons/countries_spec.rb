require "rails_helper"

RSpec.describe Importers::GeoJsons::Countries do
  subject { described_class.new(path, nil) }

  describe "#call" do
    context "when files does not exists at provided path" do
      let(:path) { "WRONG_PATH" }

      it "return nil" do
        expect(subject.call).to be_nil
      end
    end

    context "when path with proper geojson is provided" do
      let(:path) { Rails.root.join("spec/fixtures/files/dummy_colombia.geojson") }

      before { subject.call }

      it "creates correct country" do
        expect(Location.where(name_en: "Colombia", location_type: :country)).to be_exists
      end
    end
  end
end
