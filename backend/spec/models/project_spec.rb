require "rails_helper"

RSpec.describe Project, type: :model do
  subject { build(:project) }

  it { is_expected.to be_valid }

  it "should not be valid without project developer" do
    subject.project_developer = nil
    expect(subject).to have(1).errors_on(:project_developer)
  end

  it "should not be valid with wrong language" do
    subject.language = "fr"
    expect(subject).to have(1).errors_on(:language)
  end

  it "should not be valid without language" do
    subject.language = nil
    expect(subject).to have(1).errors_on(:language)
  end

  it "should not be valid without name" do
    subject.name = nil
    expect(subject).to have(1).errors_on(:name)
  end

  it "should not be valid without description" do
    subject.description = nil
    expect(subject).to have(1).errors_on(:description)
  end

  it "should not be valid without received funding" do
    subject.received_funding = nil
    expect(subject).to have(1).errors_on(:received_funding)
  end

  it "should not be valid without problem" do
    subject.problem = nil
    expect(subject).to have(1).errors_on(:problem)
  end

  it "should not be valid without solution" do
    subject.solution = nil
    expect(subject).to have(1).errors_on(:solution)
  end

  it "should not be valid without business model" do
    subject.business_model = nil
    expect(subject).to have(1).errors_on(:business_model)
  end

  it "should not be valid without sustainability" do
    subject.sustainability = nil
    expect(subject).to have(1).errors_on(:sustainability)
  end

  it "should not be valid without impact description" do
    subject.impact_description = nil
    expect(subject).to have(1).errors_on(:impact_description)
  end

  it "should not be valid without roi" do
    subject.roi = nil
    expect(subject).to have(1).errors_on(:roi)
  end

  it "should not be valid without income in last 3 years" do
    subject.income_in_last_3_years = nil
    expect(subject).to have(1).errors_on(:income_in_last_3_years)
  end

  it "should not be valid without number of employees" do
    subject.number_of_employees = nil
    expect(subject).to have(1).errors_on(:number_of_employees)
  end

  it "should not be valid without trusted" do
    subject.trusted = nil
    expect(subject).to have(1).errors_on(:trusted)
  end

  include_examples :static_relation_validations, attribute: :categories, presence: true
  include_examples :static_relation_validations, attribute: :instrument_types, presence: true
  include_examples :static_relation_validations, attribute: :ticket_size, presence: true
  include_examples :static_relation_validations, attribute: :sdgs, presence: false
end
