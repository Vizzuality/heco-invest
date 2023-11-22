module Backoffice
  module CSV
    class OpenCallExporter < BaseExporter
      def call
        generate_csv do
          column(I18n.t("backoffice.open_calls.index.name")) { |r| r.name }
          column(I18n.t("backoffice.common.investor")) { |r| r.investor.name }
          column(I18n.t("backoffice.open_calls.index.location")) { |r| [r.municipality&.name, r.department&.name, r.country&.name].compact.join(", ") }
          column(I18n.t("backoffice.open_calls.index.applications")) { |r| r.open_call_applications_count }
          column(I18n.t("backoffice.common.status")) { |r|
            if r.launched?
              I18n.t("enums.open_call_status.launched.name")
            elsif r.closed?
              I18n.t("enums.open_call_status.closed.name")
            else
              I18n.t("enums.open_call_status.draft.name")
            end
          }
          column(I18n.t("backoffice.common.verification")) { |r|
            r.verified? ? I18n.t("backoffice.common.verified") : I18n.t("backoffice.common.unverified")
          }
        end
      end
    end
  end
end
