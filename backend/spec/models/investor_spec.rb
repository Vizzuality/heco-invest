require "rails_helper"

RSpec.describe Investor, type: :model do
  subject { build(:investor) }

  it { is_expected.to be_valid }

  it "should not be valid without account" do
    subject.account = nil
    expect(subject).to have(1).errors_on(:account)
  end

  include_examples :static_relation_validations, attribute: :investor_type
  include_examples :static_relation_validations, attribute: :impacts, presence: false
  include_examples :static_relation_validations, attribute: :instrument_types
  include_examples :static_relation_validations, attribute: :ticket_sizes
  include_examples :static_relation_validations, attribute: :categories
  include_examples :static_relation_validations, attribute: :sdgs, presence: false
end
