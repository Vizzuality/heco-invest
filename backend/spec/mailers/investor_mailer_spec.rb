require "rails_helper"

RSpec.describe InvestorMailer, type: :mailer do
  let(:investor) { create :investor }
  let(:open_call) { create :open_call, investor: investor }

  describe ".open_call_destroyed" do
    let(:mail) { InvestorMailer.open_call_destroyed investor, open_call.name }

    it "renders the headers" do
      expect(mail.subject).to eq(I18n.t("investor_mailer.open_call_destroyed.subject"))
      expect(mail.to).to eq([investor.owner.email])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match(I18n.t("investor_mailer.greetings", full_name: investor.owner.full_name))
      expect(mail.body.encoded).to match(I18n.t("investor_mailer.open_call_destroyed.content", open_call_name: open_call.name))
      expect(mail.body.encoded).to match(I18n.t("investor_mailer.farewell_html"))
    end
  end

  describe ".project_destroyed" do
    let(:project) { create :project }
    let(:mail) { InvestorMailer.project_destroyed investor, project.name, open_call }

    it "renders the headers" do
      expect(mail.subject).to eq(I18n.t("investor_mailer.project_destroyed.subject"))
      expect(mail.to).to eq([investor.owner.email])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match(I18n.t("investor_mailer.greetings", full_name: investor.owner.full_name))
      expect(mail.body.encoded).to match(I18n.t("investor_mailer.project_destroyed.content", project_name: project.name, open_call_name: open_call.name))
      expect(mail.body.encoded).to match(I18n.t("investor_mailer.farewell_html"))
    end
  end

  describe ".open_call_application_destroyed" do
    let(:project) { create :project }
    let(:mail) { InvestorMailer.open_call_application_destroyed investor, project, open_call }

    it "renders the headers" do
      expect(mail.subject).to eq(I18n.t("investor_mailer.open_call_application_destroyed.subject"))
      expect(mail.to).to eq([investor.owner.email])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match(I18n.t("investor_mailer.greetings", full_name: investor.owner.full_name))
      expect(mail.body.encoded).to match(I18n.t("investor_mailer.open_call_application_destroyed.content", project_name: project.name, open_call_name: open_call.name))
      expect(mail.body.encoded).to match(I18n.t("investor_mailer.farewell_html"))
    end
  end
end
