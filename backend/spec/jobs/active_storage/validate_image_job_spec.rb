require "rails_helper"

RSpec.describe ActiveStorage::ValidateImageJob, type: :job do
  describe "#perform_later" do
    it "enqueues the job" do
      expect do
        described_class.perform_later
      end.to have_enqueued_job
    end
  end

  describe "#perform_now" do
    before { described_class.perform_now(blob) }

    context "when blob is image" do
      let(:blob) { ActiveStorage::Blob.create_and_upload! io: fixture_file_upload("picture.jpg"), filename: "test" }

      it "marks blob as validated" do
        expect(blob).to be_validated
      end
    end

    context "blob is not image" do
      let(:blob) { ActiveStorage::Blob.create_and_upload! io: fixture_file_upload("text_file.txt"), filename: "test" }

      it "keeps blob as invalidated" do
        expect(blob).not_to be_validated
      end
    end
  end
end
