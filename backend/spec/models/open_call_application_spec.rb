require "rails_helper"

RSpec.describe OpenCallApplication, type: :model do
  subject { build(:open_call_application) }

  it { is_expected.to be_valid }

  it "should not be valid without open_call" do
    subject.open_call = nil
    expect(subject).to have(1).errors_on(:open_call)
  end

  it "should not be valid without project" do
    subject.project = nil
    expect(subject).to have(1).errors_on(:project)
  end

  it "should not be valid without project_developer" do
    subject.project_developer = nil
    expect(subject).to have(1).errors_on(:project_developer)
  end

  it "should not be valid without message" do
    subject.message = nil
    expect(subject).to have(1).errors_on(:message)
  end

  it "should not be valid with wrong language" do
    subject.language = "fr"
    expect(subject).to have(1).errors_on(:language)
  end

  it "should not be valid without language" do
    subject.language = nil
    expect(subject).to have(1).errors_on(:language)
  end
end
