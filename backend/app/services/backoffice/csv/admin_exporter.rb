module Backoffice
  module CSV
    class AdminExporter < BaseExporter
      def call
        generate_csv do
          column(I18n.t("backoffice.common.name")) { |r| r.full_name }
          column(I18n.t("backoffice.common.email")) { |r| r.email }
          column(I18n.t("backoffice.common.created_at")) { |r| I18n.l r.created_at.to_date }
          column(I18n.t("backoffice.admins.index.last_sign_in_at")) { |r| I18n.l r.last_sign_in_at&.to_date, default: "" }
        end
      end
    end
  end
end
