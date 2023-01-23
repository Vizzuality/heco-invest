require "rails_helper"

RSpec.describe ImpactCalculationJob do
  let(:project) { create :project }

  describe ".perform_now" do
    let(:impact_calculation_service) { instance_double Impacts::CalculateForProject }

    before do
      allow(Impacts::CalculateForProject).to receive(:new).with(project, demands_source: Location)
        .and_return(impact_calculation_service)
    end

    it "calls impact calculation service" do
      expect(impact_calculation_service).to receive(:call)
      described_class.perform_now project.id
    end
  end
end
