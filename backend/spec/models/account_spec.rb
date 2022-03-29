require "rails_helper"

RSpec.describe Account, type: :model do
  subject { build(:account) }

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

  describe "#validate_image" do
    context "when picture is already validated" do
      before do
        subject.picture.blob.update! validated: true
      end

      it "does not create background job to validate image" do
        expect {
          subject.update! name: "NEW ACCOUNT NAME"
        }.not_to have_enqueued_job(ActiveStorage::ValidateImageJob)
      end
    end

    context "when picture is not validated yet" do
      context "when image is tempfile" do
        it "creates background job to validate image" do
          expect {
            subject.update! picture: fixture_file_upload("picture.jpg")
          }.to have_enqueued_job ActiveStorage::ValidateImageJob
        end
      end

      context "when image is signed id" do
        let(:blob) { ActiveStorage::Blob.create_and_upload! io: fixture_file_upload("picture.jpg"), filename: "test" }

        it "creates background job to validate image" do
          expect {
            subject.update! picture: blob.signed_id
          }.to have_enqueued_job ActiveStorage::ValidateImageJob
        end
      end
    end
  end
end
