require "rails_helper"

RSpec.describe ProjectInvolvement, type: :model do
  subject { build(:project_involvement) }

  it { is_expected.to be_valid }

  it "should not be valid without project" do
    subject.project = nil
    expect(subject).to have(1).errors_on(:project)
  end

  it "should not be valid without project_developer" do
    subject.project_developer = nil
    expect(subject).to have(1).errors_on(:project_developer)
  end

  it "notifies project developer owner when involvement is created" do
    expect {
      subject.save!
    }.to have_enqueued_mail(ProjectDeveloperMailer, :added_to_project).with(subject.project_developer, subject.project)
  end

  it "notifies project developer owner when involvement is destroyed" do
    subject.save!
    expect {
      subject.destroy!
    }.to have_enqueued_mail(ProjectDeveloperMailer, :removed_from_project).with(subject.project_developer, subject.project)
  end
end
