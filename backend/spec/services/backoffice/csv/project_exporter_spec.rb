require "rails_helper"

RSpec.describe Backoffice::CSV::ProjectExporter do
  subject { described_class.new(query) }

  let(:query) { create_list :project, 4, verified: true }
  let(:parsed_csv) { CSV.parse(subject.call) }

  describe "#call" do
    it "has correct headers at csv" do
      expect(parsed_csv.first).to eq([
        I18n.t("backoffice.common.project_name"),
        I18n.t("backoffice.common.project_developer"),
        I18n.t("backoffice.common.category"),
        I18n.t("backoffice.projects.index.priority_landscape"),
        I18n.t("backoffice.common.status")
      ])
    end

    it "has correct data at csv" do
      expect(parsed_csv.size).to eq(query.count + 1)
      expect(parsed_csv.second).to eq([
        query.first.name,
        query.first.project_developer.name,
        Category.find(query.first.category).name,
        query.first.priority_landscape&.name,
        I18n.t("backoffice.common.verified")
      ])
    end
  end
end
