require "rails_helper"

RSpec.describe Klab::CalculateImpactsJob, type: :job do
  let!(:project) { create :project }

  describe "#perform_later" do
    it "enqueues the job" do
      expect do
        described_class.perform_later project.id
      end.to have_enqueued_job
    end
  end

  describe ".perform_now" do
    context "when all demands are available" do
      let(:impact_calculation_service) { instance_double Impacts::CalculateForProject }

      before do
        project.update! project_demands_calculated: true,
          municipality_demands_calculated: true,
          hydrobasin_demands_calculated: true,
          priority_landscape_demands_calculated: true
        allow(Impacts::CalculateForProject).to receive(:new).with(project, demands_source: Project)
          .and_return(impact_calculation_service)
      end

      it "calls impact calculation service" do
        expect(impact_calculation_service).to receive(:call)
        expect {
          described_class.perform_now project.id
        }.not_to have_enqueued_job(described_class)
      end
    end

    context "when demands are not available yet" do
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
          }.to raise_error(Klab::DemandsNotAvailable)
        end
      end
    end
  end
end
