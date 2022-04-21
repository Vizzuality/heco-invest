require "rails_helper"

RSpec.describe ProjectImage, type: :model do
  subject { build(:project_image) }

  it { is_expected.to be_valid }

  it "should not be valid without project" do
    subject.project = nil
    expect(subject).to have(1).errors_on(:project)
  end

  it "should not be valid without file" do
    subject.file = nil
    expect(subject).to have(1).errors_on(:file)
  end

  it "should not be valid when file is not image" do
    subject.file.attach fixture_file_upload("text_file.txt")
    expect(subject).to have(1).errors_on(:file)
  end

  it "should not be valid without cover" do
    subject.cover = nil
    expect(subject).to have(1).errors_on(:cover)
  end

  describe "#keep_only_one_cover" do
    let!(:old_project_image) { create :project_image, cover: true }
    let!(:different_project_image) { create :project_image, cover: true }

    context "when cover of new record is false" do
      before do
        create :project_image, project: old_project_image.project, cover: false
      end

      it "does not change cover value of old records" do
        expect(old_project_image.reload.cover).to be_truthy
      end
    end

    context "when cover of new record is true" do
      before do
        create :project_image, project: old_project_image.project, cover: true
      end

      it "sets cover value of previous record to false" do
        expect(old_project_image.reload.cover).to be_falsey
      end

      it "does not touch records of different projects" do
        expect(different_project_image.reload.cover).to be_truthy
      end
    end
  end
end
