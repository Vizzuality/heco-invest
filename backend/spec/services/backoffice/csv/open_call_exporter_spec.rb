require "rails_helper"

RSpec.describe Backoffice::CSV::OpenCallExporter do
  subject { described_class.new(query) }

  let(:query) { create_list :open_call, 4, verified: true, status: :launched }
  let(:parsed_csv) { CSV.parse(subject.call) }

  describe "#call" do
    it "has correct headers at csv" do
      expect(parsed_csv.first).to eq([
        I18n.t("backoffice.open_calls.index.name"),
        I18n.t("backoffice.common.investor"),
        I18n.t("backoffice.open_calls.index.location"),
        I18n.t("backoffice.open_calls.index.applications"),
        I18n.t("backoffice.common.status"),
        I18n.t("backoffice.common.verification")
      ])
    end

    it "has correct data at csv" do
      expect(parsed_csv.size).to eq(query.count + 1)
      expect(parsed_csv.second).to eq([
        query.first.name,
        query.first.investor.name,
        [query.first.municipality&.name, query.first.department&.name, query.first.country&.name].compact.join(", "),
        query.first.open_call_applications_count.to_s,
        I18n.t("enum.open_call_status.launched"),
        I18n.t("backoffice.common.verified")
      ])
    end
  end
end
