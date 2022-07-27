require "rails_helper"

RSpec.describe FavouriteOpenCall, type: :model do
  subject { build(:favourite_open_call) }

  it { is_expected.to be_valid }

  it "should not be valid without user" do
    subject.user = nil
    expect(subject).to have(1).errors_on(:user)
  end

  it "should not be valid without open_call" do
    subject.open_call = nil
    expect(subject).to have(1).errors_on(:open_call)
  end

  it "should not be valid when open_call is already favourite" do
    favourite_open_call = create :favourite_open_call
    subject.assign_attributes favourite_open_call.attributes
    expect(subject).to have(1).errors_on(:open_call)
  end
end
