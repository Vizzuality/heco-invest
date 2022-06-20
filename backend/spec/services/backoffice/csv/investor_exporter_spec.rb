require "rails_helper"

RSpec.describe Backoffice::CSV::InvestorExporter do
  subject { described_class.new(query) }

  let(:query) { create_list :investor, 4 }
  let(:parsed_csv) { CSV.parse(subject.call) }

  describe "#call" do
    it "has correct headers at csv" do
      expect(parsed_csv.first).to eq([
        I18n.t("backoffice.common.name"),
        I18n.t("backoffice.common.account_owner"),
        I18n.t("backoffice.common.contact_email"),
        I18n.t("backoffice.common.contact_phone"),
        I18n.t("backoffice.common.account_users"),
        I18n.t("backoffice.investors.index.open_calls"),
        I18n.t("backoffice.common.language"),
        I18n.t("backoffice.common.status")
      ])
    end

    it "has correct data at csv" do
      expect(parsed_csv.size).to eq(query.count + 1)
      expect(parsed_csv.second).to eq([
        query.first.name,
        query.first.account.owner.full_name,
        query.first.contact_email,
        query.first.contact_phone,
        query.first.account.users_count.to_s,
        query.first.open_calls_count.to_s,
        query.first.language,
        ReviewStatus.find(query.first.account.review_status).name
      ])
    end
  end
end
