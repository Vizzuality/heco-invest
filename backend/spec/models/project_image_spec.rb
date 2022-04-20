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

  it "should not be valid without is_cover" do
    subject.is_cover = nil
    expect(subject).to have(1).errors_on(:is_cover)
  end
end
