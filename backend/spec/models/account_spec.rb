require "rails_helper"

RSpec.describe Account, type: :model do
  subject { build(:account) }

  it_behaves_like :searchable
  it_behaves_like :translatable

  it { is_expected.to be_valid }

  it "should not be valid without owner" do
    subject.owner = nil
    expect(subject).to have(1).errors_on(:owner)
  end

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

  it "should not be valid without picture" do
    subject.picture = nil
    expect(subject).to have(1).errors_on(:picture)
  end

  it "should not be valid when picture is not image" do
    subject.picture.attach fixture_file_upload("text_file.txt")
    expect(subject).to have(1).errors_on(:picture)
  end

  %w[website instagram twitter facebook linkedin].each do |link_type|
    it "should be invalid if #{link_type} is not a valid URL" do
      subject.send("#{link_type}=", "not a valid url")
      expect(subject).to have(1).errors_on(link_type)
    end
  end

  it "should not be valid without contact email" do
    subject.contact_email = nil
    expect(subject).to have(1).errors_on(:contact_email)
  end

  it "should not be valid with malformed contact email" do
    subject.contact_email = "derp"
    expect(subject).to have(1).errors_on(:contact_email)
  end

  it "should not be valid with owner from different account" do
    subject.owner = create(:user)
    expect(subject).to have(1).errors_on(:owner_id)
  end

  context "when changing review_status" do
    subject { create(:account, :unapproved) }

    it "should set reviewed_at timestamp" do
      expect(subject.reviewed_at).to be_nil
      subject.approved!
      expect(subject.reviewed_at).to be_present
    end
  end

  describe "approve!" do
    subject { create(:account, :unapproved) }
    context "when no validation errors" do
      it "should change status to approved" do
        subject.approved!
        expect(subject.review_status).to eq("approved")
      end
    end

    context "when validation errors" do
      before(:each) do
        subject.assign_attributes about_en: nil, about_es: nil, about_pt: nil
        subject.save(validate: false)
      end

      it "should not change status to approved" do
        expect {
          subject.approved!
        }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end
  end

  describe "reject!" do
    subject { create(:account, :unapproved) }
    context "when no validation errors" do
      it "should change status to rejected" do
        subject.rejected!
        expect(subject.review_status).to eq("rejected")
      end
    end

    context "when validation errors" do
      before(:each) do
        subject.assign_attributes about_en: nil, about_es: nil, about_pt: nil
        subject.save(validate: false)
      end

      it "should change status to rejected" do
        subject.rejected!
        expect(subject.review_status).to eq("rejected")
      end
    end
  end

  context "when changing ownership" do
    subject { create(:account) }

    before do
      User.invite!({email: "new_user@example.com", skip_invitation: true}, subject.owner)
      User.invite!({email: "another@example.com", skip_invitation: true}, subject.owner)
    end

    let!(:new_owner) { create(:user, account: subject) }

    it "should transfer ownership of invitations" do
      subject.reload # otherwise it does not see new_owner id in user_ids
      old_owner = subject.owner
      subject.owner = new_owner
      subject.save!

      expect(User.where(invited_by: old_owner).count).to be(0)
      expect(User.where(invited_by: new_owner).count).to be(2)
    end
  end
end
