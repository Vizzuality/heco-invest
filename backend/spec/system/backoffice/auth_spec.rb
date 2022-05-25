require "system_helper"

RSpec.describe "Backoffice: Auth", type: :system do
  let_it_be(:admin) { create(:admin, email: "admin@example.com", password: "SuperSecret6", first_name: "Admin", last_name: "Example") }

  describe "Login" do
    before { visit "/backoffice" }

    it "authenticate user successfuly" do
      fill_in :admin_email, with: "admin@example.com"
      fill_in :admin_password, with: "SuperSecret6"

      click_on "Sign in"

      expect(page).to have_text("Project developers")
    end

    context "when wrong credentials" do
      it "shows error message" do
        fill_in :admin_email, with: "admin@example.com"
        fill_in :admin_password, with: "secret3"

        click_on "Sign in"

        expect(page).to have_text("Invalid Email or password")
      end
    end
  end

  describe "Log out" do
    before { sign_in admin }

    it "works well" do
      visit "/backoffice"
      expect(page).to have_text("Project developers")

      click_on "Sign Out"

      expect(page).to have_text("Signed out successfully.")
      expect(page).to have_current_path(new_admin_session_path)
    end
  end
end
