require "rails_helper"

RSpec.describe Importers::Locations do
  subject do
    described_class.new "Colombia",
      departments_file_path: Rails.root.join("spec/fixtures/files/dummy_colombia_departments.csv"),
      municipalities_file_path: Rails.root.join("spec/fixtures/files/dummy_colombia_municipalities.csv")
  end

  describe "#call" do
    let(:departments) { Location.where(location_type: "department") }
    let(:department_names) { departments.map(&:name) }
    let(:municipalities) { Location.where(location_type: "municipality") }
    let(:municipality_names) { municipalities.map(&:name) }

    before { subject.call }

    it "inserts correct state" do
      expect(Location.where(name_en: "Colombia", location_type: "state")).to be_exists
    end

    it "inserts correct departments" do
      expect(departments.count).to eq(2)
      expect(department_names).to include("Amazonas Department")
      expect(department_names).to include("Antioquia Department")
    end

    it "assigns correct parent to departments" do
      expect(departments.map { |r| r.parent.name }.uniq).to eq(["Colombia"])
    end

    it "inserts correct municipalities" do
      expect(municipalities.count).to eq(4)
      expect(municipality_names).to include("Leticia")
      expect(municipality_names).to include("Puerto Nariño")
      expect(municipality_names).to include("Abejorral")
      expect(municipality_names).to include("Abriaquí")
    end

    it "assigns correct parents to municipalities" do
      expect(municipalities.where(name_en: ["Leticia", "Puerto Nariño"]).map { |r| r.parent.name_en }.uniq)
        .to eq(["Amazonas Department"])
      expect(municipalities.where(name_en: ["Abejorral", "Abriaquí"]).map { |r| r.parent.name }.uniq)
        .to eq(["Antioquia Department"])
    end

    context "when run multiple times" do
      it "does not corrupt locations" do
        expect { subject.call }.not_to change(Location, :count)
      end
    end
  end
end
