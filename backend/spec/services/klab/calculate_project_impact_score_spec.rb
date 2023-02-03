require "rails_helper"

RSpec.describe Klab::CalculateProjectImpactScore do
  before { VCR.turn_on! }
  after { VCR.turn_off! }

  describe :call do
    before(:each) do
      allow(Klab::PollTicket).to receive(:sleep_interval).and_return(0)
    end

    let(:service) { Klab::CalculateProjectImpactScore.new(urn: "aries.heco.locations.colombia_continental") }

    subject { service.call }

    it "returns biodiversity score for precalculated geometry" do
      VCR.use_cassette("klab/calculate_project_impact_score") do
        expect(subject.biodiversity).to eq(0.44547622987104707)
        expect(subject.climate).to eq(0.22718274463906185)
        expect(subject.community).to eq(0.4903857723709639)
        expect(subject.water).to eq(0.169560976247233)
      end
    end
  end
end
