require "rails_helper"

RSpec.describe OpenCall, type: :model do
  subject { build(:open_call) }

  it_behaves_like :searchable
  it_behaves_like :translatable

  it { is_expected.to be_valid }

  it "should not be valid without investor" do
    subject.investor = nil
    expect(subject).to have(1).errors_on(:investor)
  end

  it "should not be valid without closing at date" do
    subject.closing_at = nil
    expect(subject).to have(1).errors_on(:closing_at)
  end

  it "should not be valid without country" do
    subject.country = nil
    expect(subject).to have(1).errors_on(:country)
  end

  it "should not be valid without name" do
    subject.name = nil
    expect(subject).to have(1).errors_on(:name)
  end

  it "should not be valid without description" do
    subject.description = nil
    expect(subject).to have(1).errors_on(:description)
  end

  it "should not be valid without funding_priorities" do
    subject.funding_priorities = nil
    expect(subject).to have(1).errors_on(:funding_priorities)
  end

  it "should not be valid without funding_exclusions" do
    subject.funding_exclusions = nil
    expect(subject).to have(1).errors_on(:funding_exclusions)
  end

  it "should not be valid without impact description" do
    subject.impact_description = nil
    expect(subject).to have(1).errors_on(:impact_description)
  end

  it "should not be valid without trusted" do
    subject.trusted = nil
    expect(subject).to have(1).errors_on(:trusted)
  end

  it "should not be valid with wrong language" do
    subject.language = "fr"
    expect(subject).to have(1).errors_on(:language)
  end

  it "should not be valid without language" do
    subject.language = nil
    expect(subject).to have(1).errors_on(:language)
  end

  include_examples :static_relation_validations, attribute: :instrument_types, presence: true
  include_examples :static_relation_validations, attribute: :sdgs, presence: false
end
