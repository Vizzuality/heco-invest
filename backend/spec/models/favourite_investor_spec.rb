require "rails_helper"

RSpec.describe FavouriteInvestor, type: :model do
  subject { build(:favourite_investor) }

  it { is_expected.to be_valid }

  it "should not be valid without user" do
    subject.user = nil
    expect(subject).to have(1).errors_on(:user)
  end

  it "should not be valid without investor" do
    subject.investor = nil
    expect(subject).to have(1).errors_on(:investor)
  end

  it "should not be valid when investor is already favourite" do
    favourite_investor = create :favourite_investor
    subject.assign_attributes favourite_investor.attributes
    expect(subject).to have(1).errors_on(:investor)
  end
end
