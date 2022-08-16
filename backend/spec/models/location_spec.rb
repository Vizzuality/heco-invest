require "rails_helper"

RSpec.describe Location, type: :model do
  subject { build(:location) }

  it_behaves_like :with_ransacked_translations

  it { is_expected.to be_valid }

  it "should not be valid without name" do
    subject.name = nil
    expect(subject).to have(1).errors_on(:name)
  end

  include_examples :static_relation_validations, attribute: :location_type, presence: true
end
