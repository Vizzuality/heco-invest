require "system_helper"

RSpec.describe "Backoffice: Auth", type: :system do
  let_it_be(:admin) { create(:admin, email: "admin@example.com", password: "SuperSecret6", first_name: "Admin", last_name: "Example") }

  describe "Login" do
    before { visit "/backoffice" }

    it "authenticate user successfuly" do
      fill_in :admin_email, with: "admin@example.com"
      fill_in :admin_password, with: "SuperSecret6"

      click_on t("backoffice.sign_in.sign_in")

      expect(page).to have_text(t("backoffice.layout.project_developers"))
    end

    context "when wrong credentials" do
      it "shows error message" do
        fill_in :admin_email, with: "admin@example.com"
        fill_in :admin_password, with: "secret3"

        click_on t("backoffice.sign_in.sign_in")

        expect(page).to have_text(t("devise.failure.invalid", authentication_keys: "Email"))
      end
    end
  end

  describe "Log out" do
    before { sign_in admin }

    it "works well" do
      visit "/backoffice"
      expect(page).to have_text(t("backoffice.layout.project_developers"))

      click_on t("backoffice.layout.sign_out")

      expect(page).to have_text(t("devise.sessions.signed_out"))
      expect(page).to have_current_path(new_admin_session_path)
    end
  end
end
