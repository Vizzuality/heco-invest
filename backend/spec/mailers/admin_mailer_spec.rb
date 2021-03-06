require "rails_helper"

RSpec.describe AdminMailer, type: :mailer do
  include ActionView::Helpers::UrlHelper

  let(:admin) { create :admin }

  describe ".first_time_login_instructions" do
    let(:mail) { AdminMailer.first_time_login_instructions admin }

    it "renders the headers" do
      expect(mail.subject).to eq(I18n.t("admin_mailer.first_time_login_instructions.subject"))
      expect(mail.to).to eq([admin.email])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match(I18n.t("admin_mailer.greetings", full_name: admin.full_name))
      expect(mail.body.encoded).to match(I18n.t("admin_mailer.first_time_login_instructions.content_html", reset_password_link: ""))
      expect(mail.body.encoded).to match(I18n.t("admin_mailer.first_time_login_instructions.reset_password_link"))
      expect(mail.body.encoded).to match(I18n.t("admin_mailer.farewell_html"))
    end
  end
end
