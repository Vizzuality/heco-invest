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
      VCR.use_cassette("log_in") do
        VCR.use_cassette("submit_context") do
          VCR.use_cassette("ticket_info") do
            VCR.use_cassette("export") do
              expect(subject.biodiversity).to eq(0.554573141969294)
              expect(subject.climate).to eq(0.7727075228876347)
              expect(subject.community).to eq(0.5096478754474401)
              expect(subject.water).to eq(0.8304742998320133)
            end
          end
        end
      end
    end
  end
end
