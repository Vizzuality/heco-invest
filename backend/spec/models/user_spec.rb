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
      user = create(:user, :unconfirmed)
      expect {
        user.send_confirmation_instructions # first send
      }.to have_enqueued_mail(DeviseMailer, :confirmation_instructions)
      expect {
        travel_to((limit_period - 3.minutes).from_now) { user.send_confirmation_instructions }
        travel_to((limit_period - 2.minutes).from_now) { user.send_confirmation_instructions }
      }.not_to have_enqueued_mail(DeviseMailer, :confirmation_instructions)
    end

    it "should send another email after limited period" do
      user = create(:user, :unconfirmed)

      second_send_time = (limit_period + 1.minute).from_now
      third_send_time = second_send_time + (limit_period + 1.minute)

      expect {
        user.send_confirmation_instructions # first send
      }.to have_enqueued_mail(DeviseMailer, :confirmation_instructions)
      expect {
        travel_to((limit_period - 3.minutes).from_now) { user.send_confirmation_instructions } # do not send
      }.not_to have_enqueued_mail(DeviseMailer, :confirmation_instructions)
      expect {
        travel_to(second_send_time) { user.send_confirmation_instructions } # send
      }.to have_enqueued_mail(DeviseMailer, :confirmation_instructions)
      expect {
        travel_to(second_send_time + (limit_period - 3.minutes)) { user.send_confirmation_instructions } # do not send
      }.not_to have_enqueued_mail(DeviseMailer, :confirmation_instructions)
      expect {
        travel_to(third_send_time) { user.send_confirmation_instructions } # send
      }.to have_enqueued_mail(DeviseMailer, :confirmation_instructions)
      expect {
        travel_to(third_send_time + 2.minutes) { user.send_confirmation_instructions } # do not send
      }.not_to have_enqueued_mail(DeviseMailer, :confirmation_instructions)
    end

    def limit_period
      User::EMAIL_CONFIRMATION_LIMIT_PERIOD
    end
  end

  describe "#invalidate_session!" do
    let!(:user) { create :user }
    let!(:token) { user.token }

    before { user.invalidate_session! }

    it "changes token" do
      expect(user.reload.token).not_to eq(token)
    end
  end

  describe "#locale" do
    let(:user) { create :user, ui_language: "en" }

    context "when user have account" do
      let(:account) { create :account, language: "pt" }

      before { user.update! account: account }

      it "returns account language" do
        expect(user.locale).to eq("pt")
      end
    end

    context "when user does not have account" do
      it "returns ui_language" do
        expect(user.locale).to eq("en")
      end
    end
  end
end
