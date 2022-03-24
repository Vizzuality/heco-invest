require 'rails_helper'

RSpec.describe ProjectDeveloperLocation, type: :model do
  subject { build(:project_developer_location) }

  it { is_expected.to be_valid }

  it "should not be valid without location" do
    subject.location = nil
    expect(subject).to have(1).errors_on(:location)
  end

  it "should not be valid without project_developer" do
    subject.project_developer = nil
    expect(subject).to have(1).errors_on(:project_developer)
  end
end
