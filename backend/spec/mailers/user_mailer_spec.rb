require "rails_helper"

describe UserMailer do
  describe ".send_otp_code" do
    let(:user) { create :user, otp_secret: User.generate_otp_secret(6) }
    let(:mail) { described_class.send_otp_code(user) }

    it "renders the receiver email" do
      expect(mail.to).to eq([user.email])
    end

    it "renders the subject email" do
      expect(mail.subject).to eq(I18n.t("mailers.user.send_otp_code.subject"))
    end

    it "renders the body" do
      expect(mail.body.encoded).to match(I18n.t("mailers.user.send_otp_code.body_html", code: user.current_otp))
    end

    it ".deliver_now" do
      expect { mail.deliver_now }.to change { ActionMailer::Base.deliveries.count }.by(1)
    end
  end
end
