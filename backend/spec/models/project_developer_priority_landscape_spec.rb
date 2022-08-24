require "rails_helper"

RSpec.describe ProjectDeveloperPriorityLandscape, type: :model do
  subject { build(:project_developer_priority_landscape) }

  it { is_expected.to be_valid }

  it "should not be valid without project developer" do
    subject.project_developer = nil
    expect(subject).to have(1).errors_on(:project_developer)
  end

  it "should not be valid without priority landscape" do
    subject.priority_landscape = nil
    expect(subject).to have(1).errors_on(:priority_landscape)
  end
end
