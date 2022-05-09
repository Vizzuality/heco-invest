require "rails_helper"

RSpec.describe Investor, type: :model do
  subject { build(:investor) }

  it_behaves_like :translatable

  it { is_expected.to be_valid }

  it "should not be valid without account" do
    subject.account = nil
    expect(subject).to have(1).errors_on(:account)
  end

  it "should not be valid without how do you work" do
    subject.how_do_you_work = nil
    expect(subject).to have(1).errors_on(:how_do_you_work)
  end

  it "should not be valid without other information" do
    subject.other_information = nil
    expect(subject).to have(1).errors_on(:other_information)
  end

  it "should not be valid without previously invested" do
    subject.previously_invested = nil
    expect(subject).to have(1).errors_on(:previously_invested)
  end

  it "should not be valid with wrong language" do
    subject.language = "fr"
    expect(subject).to have(1).errors_on(:language)
  end

  it "should not be valid without language" do
    subject.language = nil
    expect(subject).to have(1).errors_on(:language)
  end

  include_examples :static_relation_validations, attribute: :investor_type, presence: true
  include_examples :static_relation_validations, attribute: :impacts, presence: false
  include_examples :static_relation_validations, attribute: :instrument_types, presence: true
  include_examples :static_relation_validations, attribute: :ticket_sizes, presence: true
  include_examples :static_relation_validations, attribute: :categories, presence: true
  include_examples :static_relation_validations, attribute: :sdgs, presence: false
end
