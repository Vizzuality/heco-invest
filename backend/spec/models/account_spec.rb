require "rails_helper"

RSpec.describe Account, type: :model do
  subject { build(:account) }

  it { is_expected.to be_valid }

  it "should not be valid without name" do
    subject.name = nil
    expect(subject).to have(1).errors_on(:name)
  end

  it "should not be valid without about" do
    subject.about = nil
    expect(subject).to have(1).errors_on(:about)
  end

  it "should not be valid with wrong language" do
    subject.language = "fr"
    expect(subject).to have(1).errors_on(:language)
  end

  it "should not be valid without language" do
    subject.language = nil
    expect(subject).to have(1).errors_on(:language)
  end

  it "should not be valid if name is taken" do
    create(:account, name: "taken")
    subject.name = "Taken"
    expect(subject).to have(1).errors_on(:name)
  end

  %w[website instagram twitter facebook linkedin].each do |link_type|
    it "should be invalid if #{link_type} is not a valid URL" do
      subject.send("#{link_type}=", "not a valid url")
      expect(subject).to have(1).errors_on(link_type)
    end
  end
end
