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

    it_behaves_like "with table pagination"
    it_behaves_like "with table sorting", columns: [
      I18n.t("backoffice.common.name"),
      I18n.t("backoffice.common.account_owner"),
      I18n.t("backoffice.common.account_users"),
      I18n.t("backoffice.project_developers.index.projects"),
      I18n.t("backoffice.common.language"),
      I18n.t("backoffice.common.status")
    ]

    it "shows project developers list" do
      within_row("Super PD Enterprise") do
        expect(page).to have_text("Tom Higgs")
        expect(page).to have_text("approved")
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
          click_on t("backoffice.common.approve")
          expect(page).to have_text("approved")
        end
      end
    end

    context "when rejecting project developer" do
      it "flips status to rejected" do
        within_row("Super PD Enterprise") do
          expect(page).to have_text("Tom Higgs")
          expect(page).to have_text("approved")
          click_on t("backoffice.common.reject")
          expect(page).to have_text("rejected")
        end
      end
    end
  end

  describe "Edit" do
    before do
      visit "/backoffice/project_developers"
      within_row("Super PD Enterprise") do
        click_on t("backoffice.common.edit")
      end
    end

    context "account language section" do
      before { within_sidebar { click_on "Account language" } }

      it "can update account language" do
        expect(page).to have_select("Language", selected: "English")
        select "Spanish", from: "Language"
        click_on "Save"
        expect(page).to have_text(t("backoffice.messages.success_update", model: t("backoffice.common.project_developer")))
        expect(approved_pd.account.reload.language).to eq("es")
      end
    end
  end
end
