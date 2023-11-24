module Backoffice
  module CSV
    class ProjectExporter < BaseExporter
      def call
        generate_csv do
          column(I18n.t("backoffice.common.project_name")) { |r| r.name }
          column(I18n.t("backoffice.common.status")) { |r|
            r.published? ? I18n.t("enums.project_status.published.name") : I18n.t("enums.project_status.draft.name")
          }
          column(I18n.t("backoffice.common.verification")) { |r|
            r.verified? ? I18n.t("backoffice.common.verified") : I18n.t("backoffice.common.unverified")
          }
          column(I18n.t("simple_form.labels.project.country")) { |r| r.country.name }
          column(I18n.t("simple_form.labels.project.department")) { |r| r.department.name }
          column(I18n.t("simple_form.labels.project.municipality")) { |r| r.municipality.name }
          column(I18n.t("backoffice.projects.index.priority_landscape")) { |r| r.priority_landscape&.name }
          column(I18n.t("simple_form.labels.project.project_developer")) { |r| r.project_developer.name }
          column(I18n.t("simple_form.labels.project.involved_project_developers")) do |r|
            r.involved_project_developers.map(&:name).join(", ")
          end
          column(I18n.t("simple_form.labels.project.development_stage")) do |r|
            ProjectDevelopmentStage.find(r.development_stage).name
          end
          column(I18n.t("simple_form.labels.project.estimated_duration_in_months")) { |r| r.estimated_duration_in_months }
          column(I18n.t("backoffice.common.category")) { |r| Category.find(r.category).name }
          column(I18n.t("simple_form.labels.project.problem")) { |r| r.problem }
          column(I18n.t("simple_form.labels.project.solution")) { |r| r.solution }
          column(I18n.t("simple_form.labels.project.target_groups")) do |r|
            r.target_groups.to_a.map { |tg| ProjectTargetGroup.find(tg).name }.join(", ")
          end
          column(I18n.t("simple_form.labels.project.expected_impact")) { |r| r.expected_impact }
          column(I18n.t("backoffice.projects.export.impact_areas")) do |r|
            r.impact_areas.to_a.map { |ia| ImpactArea.find(ia).name }.join(", ")
          end
          column(I18n.t("backoffice.projects.export.sdgs")) do |r|
            r.sdgs.map { |sdg| Sdg.find(sdg).name }.join(", ")
          end
          column(I18n.t("backoffice.projects.export.looking_for_funding")) { |r| I18n.t(r.looking_for_funding.to_s) }
          column(I18n.t("backoffice.projects.export.ticket_size")) do |r|
            r.ticket_size.present? ? "#{TicketSize.find(r.ticket_size).description} (#{TicketSize.find(r.ticket_size).name})" : ""
          end
          column(I18n.t("backoffice.projects.export.instrument_types")) do |r|
            r.instrument_types.to_a.map { |it| InstrumentType.find(it).name }.join(", ")
          end
          column(I18n.t("simple_form.labels.project.funding_plan")) { |r| r.funding_plan }
          column(I18n.t("simple_form.labels.project.received_funding")) { |r| I18n.t(r.received_funding) }
          column(I18n.t("simple_form.labels.project.received_funding_amount_usd")) { |r| r.received_funding_amount_usd }
          column(I18n.t("simple_form.labels.project.received_funding_investor")) { |r| r.received_funding_investor }
          column(I18n.t("simple_form.labels.project.positive_financial_returns")) { |r| r.positive_financial_returns }
          column(I18n.t("simple_form.labels.project.last_year_sales_revenue")) { |r| r.last_year_sales_revenue }
          column(I18n.t("simple_form.labels.project.climate_change_risks_identified")) do |r|
            I18n.t(r.climate_change_risks_identified)
          end
          column(I18n.t("simple_form.labels.project.climate_change_risks_details")) { |r| r.climate_change_risks_details }
          column(I18n.t("simple_form.labels.project.replicability")) { |r| r.replicability }
          column(I18n.t("simple_form.labels.project.sustainability")) { |r| r.sustainability }
          column(I18n.t("simple_form.labels.project.progress_impact_tracking")) { |r| r.progress_impact_tracking }
          column(I18n.t("simple_form.labels.project.description")) { |r| r.description }
          column(I18n.t("simple_form.labels.project.relevant_links")) { |r| r.relevant_links }
        end
      end
    end
  end
end
