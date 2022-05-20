require "rails_helper"

RSpec.describe ProjectDeveloper, type: :model do
  subject { build(:project_developer) }

  it { is_expected.to be_valid }

  it "should not be valid without account" do
    subject.account = nil
    expect(subject).to have(1).errors_on(:account)
  end

  it "should not be valid with wrong language" do
    subject.language = "fr"
    expect(subject).to have(1).errors_on(:language)
  end

  it "should not be valid without language" do
    subject.language = nil
    expect(subject).to have(1).errors_on(:language)
  end

  it "should not be valid without entity_legal_registration_number" do
    subject.entity_legal_registration_number = nil
    expect(subject).to have(1).errors_on(:entity_legal_registration_number)
  end

  include_examples :static_relation_validations, attribute: :project_developer_type, presence: true
  include_examples :static_relation_validations, attribute: :impacts, presence: false
  include_examples :static_relation_validations, attribute: :categories, presence: true
  include_examples :static_relation_validations, attribute: :mosaics, presence: false
end
