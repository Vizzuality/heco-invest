require "rails_helper"

RSpec.describe Translations::Translate do
  subject { described_class.new resource }

  describe "#call" do
    [Project, ProjectDeveloper, OpenCall, Investor, Account].each do |klass|
      let(:attribute) { klass.translatable_attributes.first }
      let(:resource) { create klass.table_name.singularize, "#{attribute}_en" => "TEXT_EN" }
      let(:translated_text) { "TEXT_ES" }

      before do
        allow(klass).to receive(:translatable_attributes).and_return([attribute])
        allow(subject).to receive(:translate_content_for).and_return([translated_text])
        subject.call
      end

      it "updates translation for #{klass}" do
        expect(resource.reload.public_send("#{attribute}_es")).to eq(translated_text)
      end
    end
  end
end
