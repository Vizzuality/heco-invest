require "rails_helper"

RSpec.describe Blobs::GetLink do
  subject { described_class.new blob, **options }

  let(:blob) { ActiveStorage::Blob.create_and_upload! io: fixture_file_upload("picture.jpg"), filename: "test" }
  let(:options) { {resize: "200x200"} }

  describe "#call" do
    context "when blob is analyzed" do
      # TODO: uncomment when background jobs ready
      # before do
      #   ActiveStorage::AnalyzeJob.perform_now blob
      # end

      context "when blob is image" do
        it "returns link to blob" do
          expect(subject.call).to be_kind_of(String)
        end
      end

      # context "when blob is not image" do
      #   let(:blob) { ActiveStorage::Blob.create_and_upload! io: fixture_file_upload("text_file.txt"), filename: "test" }

      #   it "is nil" do
      #     expect(subject.call).to be_nil
      #   end
      # end
    end

    # context "when blob is not analyzed" do
    #   it "is nil" do
    #     expect(subject.call).to be_nil
    #   end
    # end

    context "when blob is nil" do
      let(:blob) { nil }

      it "is nil" do
        expect(subject.call).to be_nil
      end
    end
  end
end
