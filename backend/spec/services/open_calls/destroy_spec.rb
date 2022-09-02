require "rails_helper"

RSpec.describe OpenCalls::Destroy do
  subject { described_class.new(open_call) }

  let(:open_call) { create :open_call }
  let!(:open_call_application) { create :open_call_application, open_call: open_call }

  describe "#call" do
    it "notifies investor that open call was removed" do
      expect {
        subject.call
      }.to have_enqueued_mail(InvestorMailer, :open_call_destroyed).with(open_call.investor, open_call.name)
    end

    it "notifies all project developers that open call was removed" do
      expect {
        subject.call
      }.to have_enqueued_mail(ProjectDeveloperMailer, :open_call_destroyed).with(open_call_application.project_developer, open_call.name)
    end
  end
end
