require "rails_helper"

RSpec.describe Importers::Locations do
  subject do
    described_class.new "Colombia",
      departments_file_path: Rails.root.join("spec/fixtures/files/dummy_colombia_departments.csv"),
      municipalities_file_path: Rails.root.join("spec/fixtures/files/dummy_colombia_municipalities.csv"),
      regions_file_path: Rails.root.join("spec/fixtures/files/dummy_colombia_regions.csv")
  end

  describe "#call" do
    let(:departments) { Location.where(location_type: "department") }
    let(:department_names) { departments.map(&:name) }
    let(:municipalities) { Location.where(location_type: "municipality") }
    let(:municipality_names) { municipalities.map(&:name) }
    let(:regions) { Location.where(location_type: "region") }
    let(:region_names) { regions.map(&:name) }

    before { subject.call }

    it "inserts correct country" do
      expect(Location.where(name_en: "Colombia", location_type: "country")).to be_exists
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

    it "inserts correct regions" do
      expect(regions.count).to eq(3)
      expect(region_names).to include("Cordillera Oriental")
      expect(region_names).to include("Piedemonte Amazónico - Macizo")
      expect(region_names).to include("Transición Pacífico - Caribe")
    end

    it "assigns correct parent to regions" do
      expect(regions.map { |r| r.parent.name }.uniq).to eq(["Colombia"])
    end

    it "assigns regions to municipalities" do
      expect(municipalities.where(name_en: ["Leticia", "Puerto Nariño"]).map { |r| r.regions.map(&:name) }.flatten)
        .to eq(["Piedemonte Amazónico - Macizo", "Piedemonte Amazónico - Macizo"])
      expect(municipalities.where(name_en: ["Abejorral", "Abriaquí"]).map { |r| r.regions.map(&:name) }.flatten)
        .to eq(["Cordillera Oriental", "Cordillera Oriental"])
    end

    context "when run multiple times" do
      it "does not duplicate locations" do
        expect { subject.call }.not_to change(Location, :count)
      end

      it "does not duplicate location members" do
        expect { subject.call }.not_to change(LocationMember, :count)
      end
    end
  end
end
