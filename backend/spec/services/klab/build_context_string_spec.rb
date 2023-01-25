require "rails_helper"

RSpec.describe Klab::BuildContextString do
  subject { described_class.new project, impact_level }

  let(:datetime) { DateTime.new 2023, 1, 25 }

  describe "#call" do
    context "when impact level is project" do
      let(:project) { create :project, geometry: {type: "Polygon", coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1]]]} }
      let(:impact_level) { "project" }

      it "returns correct context string" do
        travel_to datetime do
          expect(subject.call)
            .to eq("τ0(1){ttype=LOGICAL,period=[1640995200000 1672531200000],tscope=1.0,tunit=YEAR}S2(256,256){bbox=[0.0 1.0 0.0 1.0],shape=00000000030000000100000005000000000000000000000000000000003FF000000000000000000000000000003FF00000000000003FF000000000000000000000000000003FF000000000000000000000000000000000000000000000,proj=EPSG:4326}")
        end
      end
    end

    context "when impact level is municipality" do
      let(:project) { create :project, geometry: {type: "Polygon", coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1]]]} }
      let!(:location) do
        create :municipality, :with_geometry,
          geometry: RGeo::GeoJSON.decode({type: "Polygon", coordinates: [[[0.3, 0.3], [1.3, 0.3], [1.3, 1.3], [0.3, 1.3]]]}.to_json)
      end
      let(:impact_level) { "municipality" }

      it "returns correct context string" do
        travel_to datetime do
          expect(subject.call)
            .to eq("τ0(1){ttype=LOGICAL,period=[1640995200000 1672531200000],tscope=1.0,tunit=YEAR}S2(256,256){bbox=[0.3 1.3 0.3 1.3],shape=000000000300000001000000053FD33333333333333FD33333333333333FF4CCCCCCCCCCCD3FD33333333333333FF4CCCCCCCCCCCD3FF4CCCCCCCCCCCD3FD33333333333333FF4CCCCCCCCCCCD3FD33333333333333FD3333333333333,proj=EPSG:4326}")
        end
      end
    end

    context "when impact level is hydrobasin" do
      let(:project) { create :project, geometry: {type: "Polygon", coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1]]]} }
      let!(:location) do
        create :location, :with_geometry, location_type: :basin,
          geometry: RGeo::GeoJSON.decode({type: "Polygon", coordinates: [[[0.3, 0.3], [1.3, 0.3], [1.3, 3.3], [0.3, 3.3]]]}.to_json)
      end
      let(:impact_level) { "hydrobasin" }

      it "returns correct context string" do
        travel_to datetime do
          expect(subject.call)
            .to eq("τ0(1){ttype=LOGICAL,period=[1640995200000 1672531200000],tscope=1.0,tunit=YEAR}S2(256,768){bbox=[0.3 1.3 0.3 3.3],shape=000000000300000001000000053FD33333333333333FD33333333333333FF4CCCCCCCCCCCD3FD33333333333333FF4CCCCCCCCCCCD400A6666666666663FD3333333333333400A6666666666663FD33333333333333FD3333333333333,proj=EPSG:4326}")
        end
      end
    end

    context "when impact level is priority landscape" do
      let(:project) { create :project, geometry: {type: "Polygon", coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1]]]} }
      let!(:location) do
        create :priority_landscape, :with_geometry,
          geometry: RGeo::GeoJSON.decode({type: "Polygon", coordinates: [[[0.3, 0.3], [1.3, 0.3], [1.3, 1.3], [0.3, 1.3]]]}.to_json)
      end
      let(:impact_level) { "priority_landscape" }

      it "returns correct context string" do
        travel_to datetime do
          expect(subject.call)
            .to eq("τ0(1){ttype=LOGICAL,period=[1640995200000 1672531200000],tscope=1.0,tunit=YEAR}S2(256,256){bbox=[0.3 1.3 0.3 1.3],shape=000000000300000001000000053FD33333333333333FD33333333333333FF4CCCCCCCCCCCD3FD33333333333333FF4CCCCCCCCCCCD3FF4CCCCCCCCCCCD3FD33333333333333FF4CCCCCCCCCCCD3FD33333333333333FD3333333333333,proj=EPSG:4326}")
        end
      end
    end

    context "when impact level is unknown" do
      let(:project) { create :project, geometry: {type: "Polygon", coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1]]]} }
      let(:impact_level) { "UNKNOWN" }

      it "raises exception" do
        expect {
          subject.call
        }.to raise_error(described_class::UnknownImpactLevel)
      end
    end
  end
end
