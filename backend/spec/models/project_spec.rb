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

  it "should not be valid without country" do
    subject.country = nil
    expect(subject).to have(1).errors_on(:country)
  end

  it "should not be valid without municipality" do
    subject.municipality = nil
    expect(subject).to have(1).errors_on(:municipality)
  end

  it "should not be valid without department" do
    subject.department = nil
    expect(subject).to have(1).errors_on(:department)
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

  it "should not be valid without sustainability" do
    subject.sustainability = nil
    expect(subject).to have(1).errors_on(:sustainability)
  end

  it "should not be valid without replicability" do
    subject.replicability = nil
    expect(subject).to have(1).errors_on(:replicability)
  end

  it "should not be valid without expected impact" do
    subject.expected_impact = nil
    expect(subject).to have(1).errors_on(:expected_impact)
  end

  it "should not be valid without progress_impact_tracking" do
    subject.progress_impact_tracking = nil
    expect(subject).to have(1).errors_on(:progress_impact_tracking)
  end

  it "should not be valid without trusted" do
    subject.trusted = nil
    expect(subject).to have(1).errors_on(:trusted)
  end

  it "should not be valid without received funding" do
    subject.received_funding = nil
    expect(subject).to have(1).errors_on(:received_funding)
  end

  it "should not be valid without looking for funding" do
    subject.looking_for_funding = nil
    expect(subject).to have(1).errors_on(:looking_for_funding)
  end

  it "should not be valid without funding plan" do
    subject.funding_plan = nil
    expect(subject).to have(1).errors_on(:funding_plan)
  end

  include_examples :static_relation_validations, attribute: :categories, presence: true
  include_examples :static_relation_validations, attribute: :instrument_types, presence: true
  include_examples :static_relation_validations, attribute: :ticket_size, presence: true
  include_examples :static_relation_validations, attribute: :sdgs, presence: true
  include_examples :static_relation_validations, attribute: :target_groups, presence: true
  include_examples :static_relation_validations, attribute: :impact_areas, presence: true
end
