require "rails_helper"

RSpec.describe Projects::WithEmailNotification do
  subject { described_class.new(project) }

  let(:project) { create :project, :with_involved_project_developers }
  let!(:open_call_application) { create :open_call_application, project: project }

  describe "#destroy!" do
    it "notifies all project developers that project was removed" do
      expect {
        subject.destroy!
      }.to have_enqueued_mail(ProjectDeveloperMailer, :project_destroyed).with(project.project_developer, project.name)
        .and have_enqueued_mail(ProjectDeveloperMailer, :project_destroyed).with(project.involved_project_developers.first, project.name)
    end

    it "notifies all investors that project was removed" do
      expect {
        subject.destroy!
      }.to have_enqueued_mail(InvestorMailer, :project_destroyed).with(open_call_application.investor, project.name)
    end
  end
end
