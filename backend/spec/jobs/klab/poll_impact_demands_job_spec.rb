require "rails_helper"

RSpec.describe Klab::PollImpactDemandsJob, type: :job do
  let!(:project) { create :project }

  describe "#perform_later" do
    it "enqueues the job" do
      expect do
        described_class.perform_later project.id, "488lx0pni5", "project"
      end.to have_enqueued_job
    end
  end

  describe ".perform_now" do
    context "when polling is successful" do
      before do
        stub_const "ENV", ENV.to_hash.merge("KLAB_API_HOST" => "https://developers.integratedmodelling.org")
        VCR.turn_on!
      end
      after { VCR.turn_off! }

      context "when ticket is already resolved" do
        it "updates appropriate impact level demands of project" do
          VCR.use_cassette("klab/demands_for_resolved_ticket") do
            described_class.perform_now project.id, "5vxh899mfu", "project"

            project.reload
            expect(project.project_demands_calculated).to be_truthy
            expect(project.project_biodiversity_demand).to eq(0.4454376478195048)
            expect(project.project_climate_demand).to eq(0.2272383970178743)
            expect(project.project_water_demand).to eq(0.1695363053990561e0)
            expect(project.project_community_demand).to eq(0.4904006043278263)
          end
        end
      end

      context "when some observations are missing" do
        it "marks demand as calculated but skips export of artifacts" do
          VCR.use_cassette("klab/duplicity_artifacts_resolved_ticket") do
            described_class.perform_now project.id, "6ceblv03cr", "project"

            project.reload
            expect(project.project_demands_calculated).to be_truthy
            expect(project.project_biodiversity_demand).to be_nil
            expect(project.project_climate_demand).to be_nil
            expect(project.project_water_demand).to be_nil
            expect(project.project_community_demand).to be_nil
          end
        end
      end

      context "when ticket is still not resolved" do
        it "does not update project attributes" do
          VCR.use_cassette("klab/demands_for_open_ticket") do
            described_class.perform_now project.id, "5w2lovxl8d", "project"

            project.reload
            expect(project.project_demands_calculated).to be_falsey
            expect(project.project_biodiversity_demand).to be_nil
            expect(project.project_climate_demand).to be_nil
            expect(project.project_water_demand).to be_nil
            expect(project.project_community_demand).to be_nil
          end
        end

        it "enqueues poll impact job again" do
          VCR.use_cassette("klab/demands_for_open_ticket") do
            expect {
              described_class.perform_now project.id, "5w2lovxl8d", "project", rest_of_attempts: 10
            }.to have_enqueued_job(described_class).with(project.id, "5w2lovxl8d", "project", rest_of_attempts: 9)
          end
        end

        context "when number of polling attempts hits zero" do
          it "raises error which gets reported" do
            expect(Google::Cloud::ErrorReporting).to receive(:report)
            VCR.use_cassette("klab/demands_for_open_ticket") do
              expect {
                described_class.perform_now project.id, "5w2lovxl8d", "project", rest_of_attempts: 0
              }.to raise_error(Klab::OutOfPollingAttempts)
            end
          end
        end
      end
    end

    context "when polling fails with server error" do
      before do
        stub_request(:any, Regexp.new(ENV["KLAB_API_HOST"])).to_return status: 503
      end

      it "does not update project attributes" do
        described_class.perform_now project.id, "5w2lovxl8d", "project"

        project.reload
        expect(project.project_demands_calculated).to be_falsey
        expect(project.project_biodiversity_demand).to be_nil
        expect(project.project_climate_demand).to be_nil
        expect(project.project_water_demand).to be_nil
        expect(project.project_community_demand).to be_nil
      end

      it "tries to rerun job" do
        expect {
          described_class.perform_now project.id, "5w2lovxl8d", "project", rest_of_attempts: 5
        }.to have_enqueued_job(described_class).with(project.id, "5w2lovxl8d", "project", rest_of_attempts: 4)
      end

      context "when number of attempts hits zero" do
        it "reports error" do
          expect(Google::Cloud::ErrorReporting).to receive(:report)
          expect {
            described_class.perform_now project.id, "5w2lovxl8d", "project", rest_of_attempts: 0
          }.to raise_error(Faraday::ServerError)
        end

        it "sets demand calculation to true" do
          expect {
            described_class.perform_now project.id, "5w2lovxl8d", "project", rest_of_attempts: 0

            project.reload
            expect(project.project_demands_calculated).to be_truthy
          }.to raise_error(Faraday::ServerError)
        end
      end
    end
  end
end
