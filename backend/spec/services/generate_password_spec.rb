require "rails_helper"

RSpec.describe GeneratePassword do
  subject { described_class.new length }

  let(:length) { 150 }

  describe "#call" do
    it "have correct length" do
      expect(subject.call.length).to eq(length)
    end

    it "contains at least one number" do
      expect(subject.call.count("0-9")).to be_positive
    end

    it "contains at least one letter" do
      expect(subject.call.count("a-z")).to be_positive
    end

    it "contains at least one capital letter" do
      expect(subject.call.count("A-Z")).to be_positive
    end
  end
end
