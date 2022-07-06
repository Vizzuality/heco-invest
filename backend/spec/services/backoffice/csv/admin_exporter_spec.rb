require "rails_helper"

RSpec.describe Backoffice::CSV::AdminExporter do
  subject { described_class.new(query) }

  let(:query) { create_list :admin, 4 }
  let(:parsed_csv) { CSV.parse(subject.call) }

  describe "#call" do
    it "has correct headers at csv" do
      expect(parsed_csv.first).to eq([
        I18n.t("backoffice.common.name"),
        I18n.t("backoffice.common.email"),
        I18n.t("backoffice.common.created_at"),
        I18n.t("backoffice.admins.index.last_sign_in_at")
      ])
    end

    it "has correct data at csv" do
      expect(parsed_csv.size).to eq(query.count + 1)
      expect(parsed_csv.second).to eq([
        query.first.full_name,
        query.first.email,
        I18n.l(query.first.created_at.to_date),
        I18n.l(query.first.last_sign_in_at&.to_date, default: "")
      ])
    end
  end
end
