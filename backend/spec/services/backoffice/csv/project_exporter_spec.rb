require "rails_helper"

RSpec.describe Backoffice::CSV::ProjectExporter do
  subject { described_class.new(query) }

  let(:query) { create_list :project, 4, verified: true, status: :published }
  let(:parsed_csv) { CSV.parse(subject.call) }

  describe "#call" do
    it "has correct headers at csv" do
      expect(parsed_csv.first).to eq([
        I18n.t("backoffice.common.project_name"),
        I18n.t("backoffice.common.status"),
        I18n.t("backoffice.common.verification"),
        I18n.t("simple_form.labels.project.country"),
        I18n.t("simple_form.labels.project.department"),
        I18n.t("simple_form.labels.project.municipality"),
        I18n.t("backoffice.projects.index.priority_landscape"),
        I18n.t("simple_form.labels.project.project_developer"),
        I18n.t("simple_form.labels.project.involved_project_developers"),
        I18n.t("simple_form.labels.project.development_stage"),
        I18n.t("simple_form.labels.project.estimated_duration_in_months"),
        I18n.t("backoffice.common.category"),
        I18n.t("simple_form.labels.project.problem"),
        I18n.t("simple_form.labels.project.solution"),
        I18n.t("simple_form.labels.project.target_groups"),
        I18n.t("simple_form.labels.project.expected_impact"),
        I18n.t("backoffice.projects.export.impact_areas"),
        I18n.t("backoffice.projects.export.sdgs"),
        I18n.t("backoffice.projects.export.looking_for_funding"),
        I18n.t("backoffice.projects.export.ticket_size"),
        I18n.t("backoffice.projects.export.instrument_types"),
        I18n.t("simple_form.labels.project.funding_plan"),
        I18n.t("simple_form.labels.project.received_funding"),
        I18n.t("simple_form.labels.project.received_funding_amount_usd"),
        I18n.t("simple_form.labels.project.received_funding_investor"),
        I18n.t("simple_form.labels.project.positive_financial_returns"),
        I18n.t("simple_form.labels.project.last_year_sales_revenue"),
        I18n.t("simple_form.labels.project.climate_change_risks_identified"),
        I18n.t("simple_form.labels.project.climate_change_risks_details"),
        I18n.t("simple_form.labels.project.replicability"),
        I18n.t("simple_form.labels.project.sustainability"),
        I18n.t("simple_form.labels.project.progress_impact_tracking"),
        I18n.t("simple_form.labels.project.description"),
        I18n.t("simple_form.labels.project.relevant_links")
      ])
    end

    it "has correct data at csv" do
      expect(parsed_csv.size).to eq(query.count + 1)
      expect(parsed_csv.second).to eq([
        query.first.name,
        I18n.t("enums.project_status.published.name"),
        I18n.t("backoffice.common.verified"),
        query.first.country.name,
        query.first.department.name,
        query.first.municipality.name,
        query.first.priority_landscape&.name,
        query.first.project_developer.name,
        query.first.involved_project_developers.map(&:name).join(", "),
        ProjectDevelopmentStage.find(query.first.development_stage).name,
        query.first.estimated_duration_in_months.to_s,
        Category.find(query.first.category).name,
        query.first.problem,
        query.first.solution,
        query.first.target_groups.map { |tg| ProjectTargetGroup.find(tg).name }.join(", "),
        query.first.expected_impact,
        query.first.impact_areas.map { |ia| ImpactArea.find(ia).name }.join(", "),
        query.first.sdgs.map { |sdg| Sdg.find(sdg).name }.join(", "),
        I18n.t(query.first.looking_for_funding.to_s),
        "#{TicketSize.find(query.first.ticket_size).description} (#{TicketSize.find(query.first.ticket_size).name})",
        query.first.instrument_types.map { |it| InstrumentType.find(it).name }.join(", "),
        query.first.funding_plan,
        I18n.t(query.first.received_funding),
        query.first.received_funding_amount_usd.to_s,
        query.first.received_funding_investor,
        query.first.positive_financial_returns,
        query.first.last_year_sales_revenue.to_s,
        I18n.t(query.first.climate_change_risks_identified),
        query.first.climate_change_risks_details,
        query.first.replicability,
        query.first.sustainability,
        query.first.progress_impact_tracking,
        query.first.description,
        query.first.relevant_links
      ])
    end
  end
end
