require "rails_helper"

RSpec.describe Klab::CalculateProjectImpactScore do
  before { VCR.turn_on! }
  after { VCR.turn_off! }

  describe :call do
    before(:each) do
      allow(Klab::PollTicket).to receive(:sleep_interval).and_return(0)
    end

    let(:service) { Klab::CalculateProjectImpactScore.new("aries.heco.locations.colombia_continental") }

    subject { service.call }

    it "returns biodiversity score for precalculated geometry" do
      VCR.use_cassette("calculate_project_impact_score") do
        expect(subject.biodiversity).to eq(0.5545237701289529)
        expect(subject.climate).to eq(0.7728172553609381)
        expect(subject.community).to eq(0.5096142276290361)
        expect(subject.water).to eq(0.830439023752767)
      end
    end
  end
end
