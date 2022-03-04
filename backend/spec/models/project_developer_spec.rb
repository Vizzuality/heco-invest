require "rails_helper"

RSpec.describe ProjectDeveloper, type: :model do
  subject { build(:project_developer) }

  it { is_expected.to be_valid }

  it "should not be valid without account" do
    subject.account = nil
    expect(subject).to have(1).errors_on(:account)
  end

  include_examples :static_relation_validations, attribute: :project_developer_type
  include_examples :static_relation_validations, attribute: :impacts, presence: false
  include_examples :static_relation_validations, attribute: :categories
end
