require "system_helper"

RSpec.describe "Backoffice: Localization", type: :system do
  let_it_be(:admin) { create(:admin, email: "admin@example.com", password: "SuperSecret6", first_name: "Admin", last_name: "Example", ui_language: "en") }

  shared_context "localizable" do
    it "allows to switch localization" do
      expect(page).to have_select(:locale, selected: "EN")
      select "ES", from: :locale
      sleep 1
      visit "/backoffice"
      expect(page).to have_select(:locale, selected: "ES")
    end
  end

  context "when user is logged in" do
    before do
      sign_in admin
      visit "/backoffice"
    end

    include_context "localizable"
  end

  context "when user is not logged in" do
    before do
      visit "/backoffice"
    end

    include_context "localizable"
  end
end
