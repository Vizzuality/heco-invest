require "rails_helper"

RSpec.describe LocationMember, type: :model do
  subject { build(:location_member) }

  it { is_expected.to be_valid }

  it "should not be valid without location" do
    subject.location = nil
    expect(subject).to have(1).errors_on(:location)
  end

  it "should not be valid without member" do
    subject.member = nil
    expect(subject).to have(1).errors_on(:member)
  end
end
