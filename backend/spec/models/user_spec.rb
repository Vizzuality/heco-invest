require "rails_helper"

RSpec.describe User, type: :model do
  subject { build(:user) }

  it { is_expected.to be_valid }

  it "should be invalid without email" do
    subject.email = nil
    expect(subject).to have(1).errors_on(:email)
  end

  it "should be invalid with invalid email" do
    subject.email = "invalidemail"
    expect(subject).to have(1).errors_on(:email)
  end

  it "should be invalid without first name" do
    subject.first_name = nil
    expect(subject).to have(1).errors_on(:first_name)
  end

  it "should be invalid without last name" do
    subject.last_name = nil
    expect(subject).to have(1).errors_on(:last_name)
  end

  it "should be invalid with short password" do
    subject.password = "secret"
    expect(subject.errors_on(:password)).to include("must be at least 12 characters long")
  end

  it "should be invalid with too simple password" do
    subject.password = "verysimplepassword"
    expect(subject.errors_on(:password)).to include("must include at least one lowercase letter, one uppercase letter, and one digit")
  end

  context "confirmation email rate limit" do
    it "should send only one email within limited period" do
      user = create(:user)
      user.update!(confirmed_at: nil)
      travel_to(2.minutes.from_now) { user.send_confirmation_instructions }
      travel_to(3.minutes.from_now) { user.send_confirmation_instructions }
      expect(ActionMailer::Base.deliveries.count).to eq(1)
    end

    it "should send another email after limited period" do
      user = create(:user) # send
      user.update!(confirmed_at: nil)
      travel_to(2.minutes.from_now) { user.send_confirmation_instructions } # do not send
      travel_to(11.minutes.from_now) { user.send_confirmation_instructions } # send
      travel_to(13.minutes.from_now) { user.send_confirmation_instructions } # do not send
      travel_to(22.minutes.from_now) { user.send_confirmation_instructions } # send
      travel_to(23.minutes.from_now) { user.send_confirmation_instructions } # do not send
      expect(ActionMailer::Base.deliveries.count).to eq(3)
    end
  end
end
