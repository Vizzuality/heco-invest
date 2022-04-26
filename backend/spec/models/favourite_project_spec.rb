require 'rails_helper'

RSpec.describe FavouriteProject, type: :model do
  subject { build(:favourite_project) }

  it { is_expected.to be_valid }

  it "should not be valid without user" do
    subject.user = nil
    expect(subject).to have(1).errors_on(:user)
  end

  it "should not be valid without project" do
    subject.project = nil
    expect(subject).to have(1).errors_on(:project)
  end
end
