require "rails_helper"

RSpec.describe Klab::SubmitContextsJob, type: :job do
  let!(:project) { create :project }

  describe "#perform_later" do
    it "enqueues the job" do
      expect do
        described_class.perform_later project.id
      end.to have_enqueued_job
    end
  end

  describe ".perform_now" do
    context "when context submitting is successful" do
      let(:build_context_string_service) { instance_double Klab::BuildContextString }

      before do
        stub_const "ENV", ENV.to_hash.merge("KLAB_API_HOST" => "https://developers.integratedmodelling.org")
        allow(Klab::BuildContextString).to receive(:new).and_return(build_context_string_service)
        allow(build_context_string_service).to receive(:call).and_return "aries.heco.locations.colombia_continental"
        VCR.turn_on!
      end
      after { VCR.turn_off! }

      it "enqueues klab poll demand jobs" do
        VCR.use_cassette("klab/submit_context") do
          expect {
            described_class.perform_now project.id
          }.to have_enqueued_job(Klab::PollImpactDemandsJob).with(project.id, "488lx0pni5", "project")
            .and have_enqueued_job(Klab::PollImpactDemandsJob).with(project.id, "488m2y3h2r", "municipality")
            .and have_enqueued_job(Klab::PollImpactDemandsJob).with(project.id, "488m8csqj1", "hydrobasin")
            .and have_enqueued_job(Klab::PollImpactDemandsJob).with(project.id, "488mdo4wip", "priority_landscape")
        end
      end
    end

    context "when there is no context string to be send to klab" do
      let(:build_context_string_service) { instance_double Klab::BuildContextString }

      before do
        allow(Klab::BuildContextString).to receive(:new).and_return(build_context_string_service)
        allow(build_context_string_service).to receive(:call).and_return nil
      end

      it "does not enqueue klab polling jobs for such impact levels" do
        expect {
          described_class.perform_now project.id
        }.not_to have_enqueued_job(Klab::PollImpactDemandsJob)
      end

      it "marks demand calculation as done at project" do
        described_class.perform_now project.id

        project.reload
        expect(project.project_demands_calculated).to be_truthy
        expect(project.municipality_demands_calculated).to be_truthy
        expect(project.hydrobasin_demands_calculated).to be_truthy
        expect(project.priority_landscape_demands_calculated).to be_truthy
      end
    end

    context "when context submitting fails" do
      before do
        stub_request(:any, Regexp.new(ENV["KLAB_API_HOST"])).to_return status: 503
      end

      it "does not enqueue klab poll demand job" do
        expect {
          described_class.perform_now project.id
        }.not_to have_enqueued_job(Klab::PollImpactDemandsJob)
      end

      it "tries to rerun job" do
        expect {
          described_class.perform_now project.id, rest_of_attempts: 5
        }.to have_enqueued_job(described_class).with(project.id, rest_of_attempts: 4)
      end

      context "when number of attempts hits zero" do
        it "reports error" do
          expect(Google::Cloud::ErrorReporting).to receive(:report)
          expect {
            described_class.perform_now project.id, rest_of_attempts: 0
          }.to raise_error(Faraday::ServerError)
        end

        it "sets demand calculation to true" do
          expect {
            described_class.perform_now project.id, rest_of_attempts: 0

            project.reload
            expect(project.project_demands_calculated).to be_truthy
            expect(project.municipality_demands_calculated).to be_truthy
            expect(project.hydrobasin_demands_calculated).to be_truthy
            expect(project.priority_landscape_demands_calculated).to be_truthy
          }.to raise_error(Faraday::ServerError)
        end
      end
    end
  end
end
