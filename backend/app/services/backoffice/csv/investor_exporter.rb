module Backoffice
  module Csv
    class InvestorExporter < BaseExporter
      def call
        generate_csv do
          column(I18n.t("backoffice.common.name")) { |r| r.name }
          column(I18n.t("backoffice.common.account_owner")) { |r| r.account.owner.full_name }
          column(I18n.t("backoffice.common.contact_email")) { |r| r.contact_email }
          column(I18n.t("backoffice.common.contact_phone")) { |r| r.contact_phone }
          column(I18n.t("backoffice.common.account_users")) { |r| r.account.users_count }
          column(I18n.t("backoffice.investors.index.open_calls")) { |r| r.open_calls_count }
          column(I18n.t("backoffice.common.language")) { |r| r.language }
          column(I18n.t("backoffice.common.status")) { |r| ReviewStatus.find(r.account.review_status).name }
        end
      end
    end
  end
end
