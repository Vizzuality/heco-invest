require "rails_helper"

RSpec.describe ActiveStorage::AnalyzeJob do
  describe ".perform_now" do
    context "when blob is not image" do
      let!(:blob) { ActiveStorage::Blob.create_and_upload! io: fixture_file_upload("text_file.txt"), filename: "test" }

      before { ActiveStorage::AnalyzeJob.perform_now blob }

      it "marks blob as analyzed" do
        expect(blob.reload).to be_analyzed
      end
    end

    context "when blob is correct image" do
      let!(:blob) { ActiveStorage::Blob.create_and_upload! io: fixture_file_upload("picture.jpg"), filename: "test", content_type: "image/jpeg" }

      before { ActiveStorage::AnalyzeJob.perform_now blob }

      it "marks blob as analyzed" do
        expect(blob.reload).to be_analyzed
      end
    end

    context "when blob is spoofed image" do
      let!(:blob) { ActiveStorage::Blob.create_and_upload! io: fixture_file_upload("spoofed_picture.jpg"), filename: "test", content_type: "image/jpeg" }

      it "deletes blob" do
        expect {
          ActiveStorage::AnalyzeJob.perform_now blob
        }.to change(ActiveStorage::Blob, :count).by(-1)
        expect { blob.reload }.to raise_error(ActiveRecord::RecordNotFound)
      end

      context "when blob is already attached to some record" do
        let(:account) { create :account }

        before { account.picture.attach blob }

        it "deletes blob and its attachments" do
          expect {
            ActiveStorage::AnalyzeJob.perform_now blob
          }.to change(ActiveStorage::Blob, :count).by(-1)
            .and change(ActiveStorage::Attachment, :count).by(-1)
          expect { blob.reload }.to raise_error(ActiveRecord::RecordNotFound)
        end
      end
    end
  end
end
