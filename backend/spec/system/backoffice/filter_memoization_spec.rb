require "system_helper"

RSpec.describe "Backoffice: Localization", type: :system do
  let_it_be(:admin) { create(:admin, email: "admin@example.com", password: "SuperSecret6", first_name: "Admin", last_name: "Example", ui_language: "en") }

  let!(:investor) { create :investor }
  let!(:extra_investors) { create_list :investor, 20 }

  before do
    sign_in admin
    visit "/backoffice/investors"
  end

  it "keeps ransacker option" do
    expect(page).to have_css "table.backoffice-table tbody tr", count: 10
    fill_in :q_filter_full_text, with: investor.name
    find("form.investor_search button").click
    expect(page).to have_css "table.backoffice-table tbody tr", count: 1
    expect(page).to have_text(investor.name)

    visit "/backoffice/investors"
    expect(page).to have_css "table.backoffice-table tbody tr", count: 1
    expect(page).to have_text(investor.name)
  end

  it "keeps page option" do
    expect(page).to have_css "nav.pagination li span.active", text: "1"
    all("nav.pagination a[rel='next']").first.click
    expect(page).to have_css "nav.pagination li span.active", text: "2"

    visit "/backoffice/investors"
    expect(page).to have_css "nav.pagination li span.active", text: "2"
  end
end
