require "system_helper"

RSpec.describe "Backoffice: Project Developers", type: :system do
  let(:admin) { create(:admin, email: "admin@example.com", password: "SuperSecret6", first_name: "Admin", last_name: "Example") }
  let(:approved_pd_owner) { create(:user, :project_developer, first_name: "Tom", last_name: "Higgs") }
  let(:unapproved_pd_owner) { create(:user, :project_developer, first_name: "John", last_name: "Levis") }
  let!(:approved_pd) { create(:project_developer, account: build(:account, :approved, name: "Super PD Enterprise", owner: approved_pd_owner)) }
  let!(:unapproved_pd) { create(:project_developer, account: build(:account, :unapproved, name: "Unapproved PD Enterprise", owner: unapproved_pd_owner)) }

  before { sign_in admin }

  describe "Index" do
    before { visit "/backoffice/project_developers" }

    it_behaves_like "with table pagination", expected_total: 2
    it_behaves_like "with table sorting", columns: [
      I18n.t("backoffice.common.name"),
      I18n.t("backoffice.common.account_owner"),
      I18n.t("backoffice.common.contact_email"),
      I18n.t("backoffice.common.contact_phone"),
      I18n.t("backoffice.common.account_users"),
      I18n.t("backoffice.project_developers.index.projects"),
      I18n.t("backoffice.common.language"),
      I18n.t("backoffice.common.status")
    ]

    it "shows project developers list" do
      within_row("Super PD Enterprise") do
        expect(page).to have_text("Tom Higgs")
        expect(page).to have_text("approved")
        expect(page).to have_text(approved_pd.contact_email)
        expect(page).to have_text(approved_pd.contact_phone)
      end
      within_row("Unapproved PD Enterprise") do
        expect(page).to have_text("John Levis")
        expect(page).to have_text("unapproved")
      end
    end

    context "when approving project developer" do
      it "flips the status to approved" do
        within_row("Unapproved PD Enterprise") do
          expect(page).to have_text("John Levis")
          expect(page).to have_text("unapproved")
          expect {
            click_on t("backoffice.common.approve")
          }.to have_enqueued_mail(UserMailer, :approved).with(unapproved_pd_owner).once
          expect(page).to have_text("approved")
        end
      end
    end

    context "when rejecting project developer" do
      it "flips status to rejected" do
        within_row("Super PD Enterprise") do
          expect(page).to have_text("Tom Higgs")
          expect(page).to have_text("approved")
          expect {
            click_on t("backoffice.common.reject")
          }.to have_enqueued_mail(UserMailer, :rejected).with(approved_pd_owner).once
          expect(page).to have_text("rejected")
        end
      end
    end

    context "when searching" do
      it "shows only found project developers" do
        expect(page).to have_text("Super PD Enterprise")
        expect(page).to have_text("Unapproved PD Enterprise")
        fill_in :q_filter_full_text, with: "Super PD Enterprise"
        find("form.project_developer_search button").click
        expect(page).to have_text("Super PD Enterprise")
        expect(page).not_to have_text("Unapproved PD Enterprise")
      end
    end

    context "when searching by ransack filter" do
      it "returns records at correct state" do
        expect(page).to have_text(approved_pd.name)
        expect(page).to have_text(unapproved_pd.name)
        select t("activerecord.attributes.account.review_statuses.approved"), from: :q_account_review_status_eq
        click_on t("backoffice.common.apply")
        expect(page).to have_text(approved_pd.name)
        expect(page).not_to have_text(unapproved_pd.name)
      end
    end
  end
end
