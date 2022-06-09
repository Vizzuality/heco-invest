require "system_helper"

RSpec.describe "Backoffice: Investors", type: :system do
  let(:admin) { create(:admin, email: "admin@example.com", password: "SuperSecret6", first_name: "Admin", last_name: "Example") }
  let(:approved_investor_owner) { create(:user, :investor, first_name: "Tom", last_name: "Higgs") }
  let(:unapproved_investor_owner) { create(:user, :investor, first_name: "John", last_name: "Levis") }
  let!(:approved_investor) {
    create(:investor, account: build(:account, :approved, name: "Super Investor Enterprise", owner: approved_investor_owner))
  }
  let!(:unapproved_investor) {
    create(:investor, account: build(:account, :unapproved, name: "Unapproved Investor Enterprise", owner: unapproved_investor_owner))
  }

  before { sign_in admin }

  describe "Index" do
    before { visit "/backoffice/investors" }

    it_behaves_like "with table pagination"
    it_behaves_like "with table sorting", columns: [
      I18n.t("backoffice.common.name"),
      I18n.t("backoffice.common.account_owner"),
      I18n.t("backoffice.common.contact_email"),
      I18n.t("backoffice.common.contact_phone"),
      I18n.t("backoffice.common.account_users"),
      I18n.t("backoffice.investors.index.open_calls"),
      I18n.t("backoffice.common.language"),
      I18n.t("backoffice.common.status")
    ]

    it "shows investors list" do
      within_row("Super Investor Enterprise") do
        expect(page).to have_text("Tom Higgs")
        expect(page).to have_text(ReviewStatus.find("approved").name)
        expect(page).to have_text(approved_investor.contact_email)
        expect(page).to have_text(approved_investor.contact_phone)
      end
      within_row("Unapproved Investor Enterprise") do
        expect(page).to have_text("John Levis")
        expect(page).to have_text(ReviewStatus.find("unapproved").name)
      end
    end

    context "when approving investor" do
      it "flips the status to approved" do
        within_row("Unapproved Investor Enterprise") do
          expect(page).to have_text("John Levis")
          expect(page).to have_text(ReviewStatus.find("unapproved").name)
          expect {
            click_on t("backoffice.common.approve")
          }.to have_enqueued_mail(UserMailer, :approved).with(unapproved_investor_owner).once
          expect(page).to have_text(ReviewStatus.find("approved").name)
        end
      end
    end

    context "when rejecting investor" do
      it "flips status to rejected" do
        within_row("Super Investor Enterprise") do
          expect(page).to have_text("Tom Higgs")
          expect(page).to have_text(ReviewStatus.find("approved").name)
          expect {
            click_on t("backoffice.common.reject")
          }.to have_enqueued_mail(UserMailer, :rejected).with(approved_investor_owner).once
          expect(page).to have_text(ReviewStatus.find("rejected").name)
        end
      end
    end

    context "when searching" do
      it "shows only found investors" do
        expect(page).to have_text("Super Investor Enterprise")
        expect(page).to have_text("Unapproved Investor Enterprise")
        fill_in :q_filter_full_text, with: "Super Investor Enterprise"
        find("form.investor_search button").click
        expect(page).to have_text("Super Investor Enterprise")
        expect(page).not_to have_text("Unapproved Investor Enterprise")
      end
    end

    context "when searching by ransack filter" do
      it "returns records at correct state" do
        expect(page).to have_text(approved_investor.name)
        expect(page).to have_text(unapproved_investor.name)
        select ReviewStatus.find("approved").name, from: :q_account_review_status_eq
        click_on t("backoffice.common.apply")
        expect(page).to have_text(approved_investor.name)
        expect(page).not_to have_text(unapproved_investor.name)
      end
    end
  end
end
