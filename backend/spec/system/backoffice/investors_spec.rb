require "system_helper"

RSpec.describe "Backoffice: Investors", type: :system do
  let(:admin) { create(:admin, email: "admin@example.com", password: "SuperSecret6", first_name: "Admin", last_name: "Example") }
  let(:approved_investor_owner) { create(:user, :investor, first_name: "Tom", last_name: "Higgs") }
  let(:unapproved_investor_owner) { create(:user, :investor, first_name: "John", last_name: "Levis") }
  let!(:approved_pd) {
    create(:investor, account: build(:account, :approved, name: "Super Investor Enterprise", owner: approved_investor_owner))
  }
  let!(:unapproved_pd) {
    create(:investor, account: build(:account, :unapproved, name: "Unapproved Investor Enterprise", owner: unapproved_investor_owner))
  }

  before { sign_in admin }

  describe "Index" do
    before { visit "/backoffice/investors" }

    it_behaves_like "with table pagination"

    it "shows investors list" do
      within_row("Super Investor Enterprise") do
        expect(page).to have_text("Tom Higgs")
        expect(page).to have_text("approved")
      end
      within_row("Unapproved Investor Enterprise") do
        expect(page).to have_text("John Levis")
        expect(page).to have_text("unapproved")
      end
    end

    context "when approving investor" do
      it "flips the status to approved" do
        within_row("Unapproved Investor Enterprise") do
          expect(page).to have_text("John Levis")
          expect(page).to have_text("unapproved")
          expect {
            click_on t("backoffice.common.approve")
          }.to have_enqueued_mail(UserMailer, :approved).with(unapproved_investor_owner).once
          expect(page).to have_text("approved")
        end
      end
    end

    context "when rejecting investor" do
      it "flips status to rejected" do
        within_row("Super Investor Enterprise") do
          expect(page).to have_text("Tom Higgs")
          expect(page).to have_text("approved")
          expect {
            click_on t("backoffice.common.reject")
          }.to have_enqueued_mail(UserMailer, :rejected).with(approved_investor_owner).once
          expect(page).to have_text("rejected")
        end
      end
    end
  end
end
