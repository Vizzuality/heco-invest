require "rails_helper"

RSpec.describe Blobs::GetLink do
  subject { described_class.new blob, **options }

  let(:blob) { create(:account).picture }
  let(:options) { {resize: "200x200"} }

  describe "#call" do
    it "returns link to blob" do
      expect(subject.call).to be_kind_of(String)
    end

    context "when blob is nil" do
      let(:blob) { nil }

      it "is nil" do
        expect(subject.call).to be_nil
      end
    end
  end
end
