require "system_helper"

RSpec.describe "Backoffice: Open Calls", type: :system do
  let(:admin) { create(:admin, email: "admin@example.com", password: "SuperSecret6", first_name: "Admin", last_name: "Example") }
  let!(:open_call) {
    create(
      :open_call,
      name: "Open Call ultra name",
      investor: create(:investor, account: create(:account, name: "Ultra investor name")),
      trusted: true
    )
  }
  let!(:open_calls) { create_list(:open_call, 4) }

  before { sign_in admin }

  describe "Index" do
    before { visit "/backoffice/open_calls" }

    it_behaves_like "with table pagination", expected_total: 5
    it_behaves_like "with table sorting", columns: [
      I18n.t("backoffice.open_calls.index.name"),
      I18n.t("backoffice.common.investor"),
      I18n.t("backoffice.open_calls.index.location"),
      I18n.t("backoffice.open_calls.index.applications"),
      I18n.t("backoffice.common.status")
    ]
    it_behaves_like "with csv export", file_name: "open_calls.csv"

    it "shows open calls list" do
      expect(page).to have_xpath(".//tbody/tr", count: 5)
      within_row("Open Call ultra name") do
        expect(page).to have_text("Ultra investor name")
        expect(page).to have_text([open_call.municipality.name, open_call.department.name, open_call.country.name].join(", "))
        expect(page).to have_text(open_call.open_call_applications_count)
        expect(page).to have_text(I18n.t("backoffice.common.verified"))
      end
    end

    context "when searching by ransack filter" do
      context "when using full text" do
        it "shows only found open calls" do
          expect(page).to have_text(open_call.name)
          open_calls.each { |o| expect(page).to have_text(o.name) }
          fill_in :q_filter_full_text, with: open_call.name
          find("form.open_call_search button").click
          expect(page).to have_text(open_call.name)
          open_calls.each { |o| expect(page).not_to have_text(o.name) }
        end
      end

      context "when filtered by trusted flag" do
        before { open_call.update! trusted: true }

        it "returns records at correct state" do
          expect(page).to have_text(open_call.name)
          open_calls.each { |o| expect(page).to have_text(o.name) }
          select t("backoffice.common.verified"), from: :q_trusted_eq
          click_on t("backoffice.common.apply")
          expect(page).to have_text(open_call.name)
          open_calls.each { |o| expect(page).not_to have_text(o.name) }
        end
      end
    end
  end
end
