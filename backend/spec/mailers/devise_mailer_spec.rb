require "rails_helper"

RSpec.describe DeviseMailer, type: :mailer do
  include ActionView::Helpers::UrlHelper

  {user: %i[confirmation_instructions reset_password_instructions invitation_instructions],
   admin: %i[reset_password_instructions]}.each do |record_type, mail_types|
    context "when used for #{record_type}" do
      let(:record) { create record_type }

      mail_types.each do |mail_type|
        describe ".#{mail_type}" do
          let(:mail) { DeviseMailer.public_send mail_type, record, "TOKEN", {fallback_language: "en"} }

          before do
            allow(record).to receive(:invitation_due_at).and_return(1.day.from_now) if record.respond_to?(:invitation_due_at)
          end

          context "when locale variable is used" do
            before do
              allow(record).to receive(:locale).and_return("es")
            end

            it "localize email based on user locale" do
              I18n.with_locale "es" do
                expect(mail.subject).to eq(I18n.t("devise.mailer.#{mail_type}.subject"))
                expect(mail.to).to eq([record.email])
              end
            end
          end

          context "when fallback language is used" do
            before do
              allow(record).to receive(:locale).and_return(nil)
            end

            it "localize email based on user locale" do
              I18n.with_locale "en" do
                expect(mail.subject).to eq(I18n.t("devise.mailer.#{mail_type}.subject"))
                expect(mail.to).to eq([record.email])
              end
            end
          end
        end
      end
    end
  end
end
