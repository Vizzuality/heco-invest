require "rails_helper"

RSpec.describe Accounts::WithEmailNotification do
  subject { described_class.new(account) }

  describe "#destroy!" do
    context "when account is project developer" do
      let(:project_developer) { create :project_developer }
      let(:account) { project_developer.account }
      let(:project) { create :project, project_developer: project_developer }
      let!(:open_call_application) { create :open_call_application, project: project }

      it "notifies account users that they were removed" do
        expect {
          subject.destroy!
          expect(User.where(account: account)).not_to be_exist
        }.to have_enqueued_mail(UserMailer, :destroyed).with(account.owner.email, account.owner.full_name, account.owner.locale)
      end

      it "notifies investors that project was removed" do
        expect {
          subject.destroy!
          expect(Project.where(project_developer: project_developer)).not_to be_exist
        }.to have_enqueued_mail(InvestorMailer, :project_destroyed).with(open_call_application.investor, project.name)
      end
    end

    context "when account is investor" do
      let(:investor) { create :investor }
      let(:account) { investor.account }
      let(:open_call) { create :open_call, investor: investor }
      let!(:open_call_application) { create :open_call_application, open_call: open_call }

      it "notifies account users that they were removed" do
        expect {
          subject.destroy!
          expect(User.where(account: account)).not_to be_exist
        }.to have_enqueued_mail(UserMailer, :destroyed).with(account.owner.email, account.owner.full_name, account.owner.locale)
      end

      it "notifies project developers that open call was removed" do
        expect {
          subject.destroy!
          expect(OpenCall.where(investor: investor)).not_to be_exist
        }.to have_enqueued_mail(ProjectDeveloperMailer, :open_call_destroyed).with(open_call_application.project_developer, open_call.name)
      end
    end
  end
end
