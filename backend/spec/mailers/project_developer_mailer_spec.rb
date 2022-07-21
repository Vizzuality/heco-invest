require "rails_helper"

RSpec.describe ProjectDeveloperMailer, type: :mailer do
  include ActionView::Helpers::UrlHelper

  let(:project_developer) { create :project_developer }
  let(:project) { create :project }

  describe ".added_to_project" do
    let(:mail) { ProjectDeveloperMailer.added_to_project project_developer, project }

    it "renders the headers" do
      expect(mail.subject).to eq(I18n.t("project_developer_mailer.added_to_project.subject"))
      expect(mail.to).to eq([project_developer.owner.email])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match(I18n.t("project_developer_mailer.greetings", full_name: project_developer.owner.full_name))
      expect(mail.body.encoded).to match(I18n.t("project_developer_mailer.added_to_project.content", project_name: project.name))
      expect(mail.body.encoded).to match(I18n.t("project_developer_mailer.farewell_html"))
    end
  end

  describe ".removed_from_project" do
    let(:mail) { ProjectDeveloperMailer.removed_from_project project_developer, project }

    it "renders the headers" do
      expect(mail.subject).to eq(I18n.t("project_developer_mailer.removed_from_project.subject"))
      expect(mail.to).to eq([project_developer.owner.email])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match(I18n.t("project_developer_mailer.greetings", full_name: project_developer.owner.full_name))
      expect(mail.body.encoded).to match(I18n.t("project_developer_mailer.removed_from_project.content", project_name: project.name))
      expect(mail.body.encoded).to match(I18n.t("project_developer_mailer.farewell_html"))
    end
  end

  describe ".project_destroyed" do
    let(:mail) { ProjectDeveloperMailer.project_destroyed project_developer, project.name }

    it "renders the headers" do
      expect(mail.subject).to eq(I18n.t("project_developer_mailer.project_destroyed.subject"))
      expect(mail.to).to eq([project_developer.owner.email])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match(I18n.t("project_developer_mailer.greetings", full_name: project_developer.owner.full_name))
      expect(mail.body.encoded).to match(I18n.t("project_developer_mailer.project_destroyed.content", project_name: project.name))
      expect(mail.body.encoded).to match(I18n.t("project_developer_mailer.farewell_html"))
    end
  end
end
