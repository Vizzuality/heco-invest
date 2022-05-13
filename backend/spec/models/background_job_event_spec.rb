require "rails_helper"

RSpec.describe BackgroundJobEvent, type: :model do
  subject { build(:background_job_event) }

  it { is_expected.to be_valid }

  it "should not be valid without executions" do
    subject.executions = nil
    expect(subject).to have(1).errors_on(:executions)
  end
end
