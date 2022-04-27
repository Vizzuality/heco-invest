require "rails_helper"

RSpec.describe FavouriteProjectDeveloper, type: :model do
  subject { build(:favourite_project_developer) }

  it { is_expected.to be_valid }

  it "should not be valid without user" do
    subject.user = nil
    expect(subject).to have(1).errors_on(:user)
  end

  it "should not be valid without project_developer" do
    subject.project_developer = nil
    expect(subject).to have(1).errors_on(:project_developer)
  end

  it "should not be valid when project_developer is already favourite" do
    favourite_project_developer = create :favourite_project_developer
    subject.assign_attributes favourite_project_developer.attributes
    expect(subject).to have(1).errors_on(:project_developer)
  end
end
