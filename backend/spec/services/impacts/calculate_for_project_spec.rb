require "rails_helper"

RSpec.describe Impacts::CalculateForProject do
  subject { described_class.new project }

  describe "#call" do
    let(:project) do
      create :project,
        geometry: {type: "Polygon", coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1]]]},
        impact_areas: %w[conservation restoration pollutants-reduction water-capacity-or-efficiency gender-equality-jobs]
    end
    let!(:municipality_at_different_location) do
      create :municipality, :with_geometry,
        geometry: RGeo::GeoJSON.decode({type: "Polygon", coordinates: [[[1.3, 1.3], [2.3, 1.3], [2.3, 2.3], [1.3, 2.3]]]}.to_json)
    end
    let!(:municipality) do
      create :municipality, :with_geometry,
        geometry: RGeo::GeoJSON.decode({type: "Polygon", coordinates: [[[0.3, 0.3], [1.3, 0.3], [1.3, 1.3], [0.3, 1.3]]]}.to_json),
        biodiversity_demand: 0.7,
        climate_demand: 0.8,
        water_demand: 0.7,
        community_demand: 0.2
    end
    let!(:basin) do
      create :location, :with_geometry, location_type: :basin,
        geometry: RGeo::GeoJSON.decode({type: "Polygon", coordinates: [[[0.4, 0.4], [1.4, 0.4], [1.4, 1.4], [0.4, 1.4]]]}.to_json),
        biodiversity_demand: 0.1,
        climate_demand: 0.1,
        water_demand: 0.1,
        community_demand: 0.8
    end
    let!(:mosaic) do
      create :location, :with_geometry, location_type: :region,
        geometry: RGeo::GeoJSON.decode({type: "Polygon", coordinates: [[[0.4, 0.4], [1.4, 0.4], [1.4, 1.4], [0.4, 1.4]]]}.to_json),
        biodiversity_demand: 0,
        climate_demand: 0,
        water_demand: 0,
        community_demand: 0
    end

    before { subject.call }

    it "computes correct region impacts" do
      project.reload
      expect(project.municipality_biodiversity_impact).to eq(0)
      expect(project.municipality_climate_impact).to eq(0)
      expect(project.municipality_water_impact.round(10)).to eq(0.8655555556)
      expect(project.municipality_community_impact.round(10)).to eq(0.9822222222)
    end

    it "computes correct basin impacts" do
      project.reload
      expect(project.hydrobasin_biodiversity_impact).to eq(0)
      expect(project.hydrobasin_climate_impact).to eq(0)
      expect(project.hydrobasin_water_impact).to eq(0)
      expect(project.hydrobasin_community_impact.round(10)).to eq(0.7822222222)
    end

    it "computes correct mosaic impacts" do
      project.reload
      expect(project.priority_landscape_biodiversity_impact).to eq(0)
      expect(project.priority_landscape_climate_impact).to eq(0)
      expect(project.priority_landscape_water_impact.round(10)).to eq(0)
      expect(project.priority_landscape_community_impact.round(10)).to eq(0.8888888889)
    end

    it "computes correct total impact" do
      project.reload
      expect(project.total_impact.round(10)).to eq(0.2932407407)
    end

    context "when no intersect locations are found" do
      let(:project) do
        create :project,
          geometry: {type: "Polygon", coordinates: [[[100, 100], [101, 100], [101, 101], [100, 101]]]},
          impact_areas: %w[conservation restoration pollutants-reduction water-capacity-or-efficiency gender-equality-jobs]
      end

      it "does not modify impact attributes" do
        project.reload
        expect(project.municipality_biodiversity_impact).to be_nil
        expect(project.municipality_climate_impact).to be_nil
        expect(project.municipality_water_impact).to be_nil
        expect(project.municipality_community_impact).to be_nil
        expect(project.hydrobasin_biodiversity_impact).to be_nil
        expect(project.hydrobasin_climate_impact).to be_nil
        expect(project.hydrobasin_water_impact).to be_nil
        expect(project.hydrobasin_community_impact).to be_nil
        expect(project.priority_landscape_biodiversity_impact).to be_nil
        expect(project.priority_landscape_climate_impact).to be_nil
        expect(project.priority_landscape_water_impact).to be_nil
        expect(project.priority_landscape_community_impact).to be_nil
        expect(project.total_impact).to be_nil
      end
    end

    context "when suitable location does not have demand specified" do
      let!(:municipality) do
        create :municipality, :with_geometry,
          geometry: RGeo::GeoJSON.decode({type: "Polygon", coordinates: [[[0.3, 0.3], [1.3, 0.3], [1.3, 1.3], [0.3, 1.3]]]}.to_json),
          biodiversity_demand: nil,
          climate_demand: nil,
          water_demand: nil,
          community_demand: nil
      end

      it "impact values corresponds to zero" do
        project.reload
        expect(project.municipality_biodiversity_impact).to eq(0)
        expect(project.municipality_climate_impact).to eq(0)
        expect(project.municipality_water_impact).to eq(0)
        expect(project.municipality_community_impact).to eq(0)
      end
    end
  end
end
