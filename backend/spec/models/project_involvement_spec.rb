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
    let!(:project_developer) { create :project_developer }
    let!(:project) { create :project }

    context "when project is published" do
      it "notifies project developer owner" do
        expect {
          create :project_involvement, project: project.reload, project_developer: project_developer
        }.to have_enqueued_mail(ProjectDeveloperMailer, :added_to_project).with(project_developer, project)
      end
    end

    context "when project is draft" do
      before { project.update! status: :draft }

      it "does not notifies project developer owner" do
        expect {
          create :project_involvement, project: project.reload, project_developer: project_developer
        }.not_to have_enqueued_mail(ProjectDeveloperMailer, :added_to_project)
      end
    end
  end

  describe "removed_from_project notification" do
    let!(:project_involvement) { create :project_involvement }

    context "when project is published" do
      it "notifies project developer owner" do
        expect {
          project_involvement.reload.destroy!
        }.to have_enqueued_mail(ProjectDeveloperMailer, :removed_from_project).with(project_involvement.project_developer, project_involvement.project)
      end
    end

    context "when project is draft" do
      before { project_involvement.project.update! status: :draft }

      it "does not notifies project developer owner" do
        expect {
          project_involvement.reload.destroy!
        }.not_to have_enqueued_mail(ProjectDeveloperMailer, :removed_from_project)
      end
    end
  end
end
