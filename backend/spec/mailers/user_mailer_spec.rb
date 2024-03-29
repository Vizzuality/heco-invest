require "rails_helper"

RSpec.describe UserMailer, type: :mailer do
  include ActionView::Helpers::UrlHelper

  let(:user) { create :user, account: create(:account), otp_secret: User.generate_otp_secret(6) }

  describe ".approved" do
    let(:mail) { UserMailer.approved user }

    it "renders the headers" do
      expect(mail.subject).to eq(I18n.t("user_mailer.approved.subject"))
      expect(mail.to).to eq([user.email])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match(I18n.t("user_mailer.greetings", full_name: user.full_name))
      expect(mail.body.encoded).to match(I18n.t("user_mailer.approved.content"))
      expect(mail.body.encoded).to match(I18n.t("user_mailer.farewell_html"))
    end
  end

  describe ".rejected" do
    let(:mail) { UserMailer.rejected user }

    it "renders the headers" do
      expect(mail.subject).to eq(I18n.t("user_mailer.rejected.subject"))
      expect(mail.to).to eq([user.email])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match(I18n.t("user_mailer.greetings", full_name: user.full_name))
      expect(mail.body.encoded).to match(I18n.t("user_mailer.rejected.content_html",
        contact_url: link_to(nil, ENV["FRONTEND_URL"])))
      expect(mail.body.encoded).to match(I18n.t("user_mailer.farewell_html"))
    end
  end

  describe ".ownership_transferred" do
    let(:mail) { UserMailer.ownership_transferred user }

    it "renders the headers" do
      expect(mail.subject).to eq(I18n.t("user_mailer.ownership_transferred.subject"))
      expect(mail.to).to eq([user.email])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match(I18n.t("user_mailer.greetings", full_name: user.full_name))
      expect(mail.body.encoded).to match(I18n.t("user_mailer.ownership_transferred.content", name: user.account.name))
      expect(mail.body.encoded).to match(I18n.t("user_mailer.farewell_html"))
    end
  end

  describe ".destroyed" do
    let(:mail) { UserMailer.destroyed user.email, user.full_name, "en" }

    it "renders the headers" do
      expect(mail.subject).to eq(I18n.t("user_mailer.destroyed.subject"))
      expect(mail.to).to eq([user.email])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match(I18n.t("user_mailer.greetings", full_name: user.full_name))
      expect(mail.body.encoded).to match(I18n.t("user_mailer.destroyed.content"))
      expect(mail.body.encoded).to match(I18n.t("user_mailer.farewell_html"))
    end
  end

  describe ".send_otp_code" do
    let(:mail) { UserMailer.send_otp_code user }

    it "renders the headers" do
      expect(mail.subject).to eq(I18n.t("user_mailer.send_otp_code.subject"))
      expect(mail.to).to eq([user.email])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match(I18n.t("user_mailer.send_otp_code.body_html", code: user.current_otp))
    end
  end
end
