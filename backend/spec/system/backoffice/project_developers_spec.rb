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

    context "Approve" do
      it "approves selected project developer" do
        within_row("Unapproved PD Enterprise") do
          expect(page).to have_text("John Levis")
          expect(page).to have_text("unapproved")
          click_on "Approve"
          expect(page).to have_text("approved")
        end
      end
    end

    context "Reject" do
      it "rejects selected project developer" do
        within_row("Super PD Enterprise") do
          expect(page).to have_text("Tom Higgs")
          expect(page).to have_text("approved")
          click_on "Reject"
          expect(page).to have_text("rejected")
        end
      end
    end
  end
end
