require "rails_helper"

RSpec.describe Translations::Translate do
  before do
    credentials = double(Google::Auth::UserRefreshCredentials)
    allow(credentials).to receive(:quota_project_id).and_return("heco")
    allow(Google::Auth).to receive(:get_application_default).and_return(credentials)
  end
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
