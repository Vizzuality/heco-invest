require "rails_helper"

RSpec.describe Backoffice::CSV::UserExporter do
  subject { described_class.new(query) }

  let(:query) { create_list :user, 4, account: create(:account) }
  let(:parsed_csv) { CSV.parse(subject.call) }

  describe "#call" do
    it "has correct headers at csv" do
      expect(parsed_csv.first).to eq([
        I18n.t("backoffice.common.name"),
        I18n.t("backoffice.common.email"),
        I18n.t("backoffice.users.index.account"),
        I18n.t("backoffice.common.account_owner"),
        I18n.t("backoffice.common.created_at"),
        I18n.t("backoffice.admins.index.last_sign_in_at")
      ])
    end

    it "has correct data at csv" do
      expect(parsed_csv.size).to eq(query.count + 1)
      expect(parsed_csv.second).to eq([
        query.first.full_name,
        query.first.email,
        query.first.account.name,
        I18n.t(query.first.owner_account.present?),
        I18n.l(query.first.created_at.to_date),
        I18n.l(query.first.last_sign_in_at&.to_date, default: "")
      ])
    end
  end
end
