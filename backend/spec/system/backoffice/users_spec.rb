require "system_helper"

RSpec.describe "Backoffice: Users", type: :system do
  let!(:admin) { create(:admin, email: "admin@example.com", password: "SuperSecret6", first_name: "Admin", last_name: "Example") }
  let!(:user) { create(:account).owner }
  let!(:users) { create_list :user, 2 }

  before { sign_in admin }

  describe "Index" do
    before { visit "/backoffice/users" }

    it_behaves_like "with table pagination", expected_total: 3
    it_behaves_like "with table sorting", columns: [
      I18n.t("backoffice.common.name"),
      I18n.t("backoffice.common.email"),
      I18n.t("backoffice.users.index.account"),
      I18n.t("backoffice.common.created_at"),
      I18n.t("backoffice.users.index.last_sign_in_at")
    ]
    it_behaves_like "with csv export", file_name: "users.csv"

    it "shows users list" do
      within_row(user.full_name) do
        expect(page).to have_text(user.email)
        expect(page).to have_text(user.account.name)
        expect(page).to have_text(I18n.l(user.created_at.to_date))
        expect(page).to have_text(I18n.l(user.last_sign_in_at&.to_date, default: ""))
      end
    end

    context "when searching" do
      it "shows only found users" do
        expect(page).to have_text(user.full_name)
        users.each { |u| expect(page).to have_text(u.full_name) }
        fill_in :q_filter_full_text, with: user.full_name
        find("form.user_search button").click
        expect(page).to have_text(user.full_name)
        users.each { |u| expect(page).not_to have_text(u.full_name) }
      end
    end
  end
end
