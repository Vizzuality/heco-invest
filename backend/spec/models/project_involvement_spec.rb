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

  describe "added_to_project notification" do
    context "when project is published" do
      it "notifies project developer owner" do
        expect {
          subject.save!
        }.to have_enqueued_mail(ProjectDeveloperMailer, :added_to_project).with(subject.project_developer, subject.project)
      end
    end

    context "when project is draft" do
      before { subject.project.update! status: :draft }

      it "does not notifies project developer owner" do
        expect {
          subject.save!
        }.not_to have_enqueued_mail(ProjectDeveloperMailer, :added_to_project)
      end
    end
  end

  describe "removed_from_project notification" do
    before { subject.save! }

    context "when project is published" do
      it "notifies project developer owner" do
        expect {
          subject.destroy!
        }.to have_enqueued_mail(ProjectDeveloperMailer, :removed_from_project).with(subject.project_developer, subject.project)
      end
    end

    context "when project is draft" do
      before { subject.project.update! status: :draft }

      it "does not notifies project developer owner" do
        expect {
          subject.destroy!
        }.not_to have_enqueued_mail(ProjectDeveloperMailer, :removed_from_project)
      end
    end
  end
end
