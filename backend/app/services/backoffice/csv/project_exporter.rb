module Backoffice
  module CSV
    class ProjectExporter < BaseExporter
      def call
        generate_csv do
          column(I18n.t("backoffice.common.project_name")) { |r| r.name }
          column(I18n.t("backoffice.common.project_developer")) { |r| r.project_developer.name }
          column(I18n.t("backoffice.common.category")) { |r| Category.find(r.category).name }
          column(I18n.t("backoffice.projects.index.priority_landscape")) { |r| r.priority_landscape&.name }
          column(I18n.t("backoffice.common.status")) { |r|
            r.published? ? I18n.t("enum.project_status.published") : I18n.t("enum.project_status.draft")
          }
          column(I18n.t("backoffice.common.verification")) { |r|
            r.verified? ? I18n.t("backoffice.common.verified") : I18n.t("backoffice.common.unverified")
          }
        end
      end
    end
  end
end
