require "rails_helper"

RSpec.describe OpenCall, type: :model do
  subject { build(:open_call) }

  it { is_expected.to be_valid }

  it "should not be valid without investor" do
    subject.investor = nil
    expect(subject).to have(1).errors_on(:investor)
  end

  it "should not be valid without closing at date" do
    subject.closing_at = nil
    expect(subject).to have(1).errors_on(:closing_at)
  end

  it "should not be valid with wrong language" do
    subject.language = "fr"
    expect(subject).to have(1).errors_on(:language)
  end

  it "should not be valid without language" do
    subject.language = nil
    expect(subject).to have(1).errors_on(:language)
  end

  include_examples :static_relation_validations, attribute: :instrument_type
  include_examples :static_relation_validations, attribute: :ticket_size
  include_examples :static_relation_validations, attribute: :sdgs, presence: false
end
