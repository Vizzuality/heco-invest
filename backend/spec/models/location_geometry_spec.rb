require "rails_helper"

RSpec.describe LocationGeometry, type: :model do
  subject { build(:location_geometry) }

  it { is_expected.to be_valid }

  it "should not be valid without location" do
    subject.location = nil
    expect(subject).to have(1).errors_on(:location)
  end

  it "should not be valid without geometry" do
    subject.geometry = nil
    expect(subject).to have(1).errors_on(:geometry)
  end
end
