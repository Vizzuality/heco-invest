require "system_helper"

RSpec.describe "Backoffice: Users", type: :system do
  let!(:admin) { create(:admin, email: "admin@example.com", password: "SuperSecret6", first_name: "Admin", last_name: "Example") }
  let!(:owner) { create(:project_developer).owner }
  let!(:user) { create :user }

  before { sign_in admin }

  describe "Index" do
    before { visit "/backoffice/users" }

    it_behaves_like "with table pagination", expected_total: 2
    it_behaves_like "with table sorting", columns: [
      I18n.t("backoffice.common.name"),
      I18n.t("backoffice.common.email"),
      I18n.t("backoffice.users.index.account"),
      I18n.t("backoffice.common.created_at"),
      I18n.t("backoffice.users.index.last_sign_in_at")
    ]
    it_behaves_like "with csv export", file_name: "users.csv"

    it "shows users list" do
      within_row(owner.full_name) do
        expect(page).to have_text(owner.email)
        expect(page).to have_text(owner.account.name)
        expect(page).to have_text(I18n.l(owner.created_at.to_date))
        expect(page).to have_text(I18n.l(owner.last_sign_in_at&.to_date, default: ""))
      end
    end

    context "when searching" do
      it "shows only found users" do
        expect(page).to have_text(owner.full_name)
        expect(page).to have_text(user.full_name)
        fill_in :q_filter_full_text, with: owner.full_name
        find("form.user_search button").click
        expect(page).to have_text(owner.full_name)
        expect(page).not_to have_text(user.full_name)
      end
    end

    context "when deleting user via menu" do
      it "deletes user" do
        within_row(user.full_name) do
          find("button.rounded-full").click
          accept_confirm do
            click_on t("backoffice.common.delete")
          end
        end
        expect(page).not_to have_text(user.full_name)
      end
    end
  end

  describe "Edit" do
    before do
      visit "/backoffice/users"
      within_row(user.full_name) do
        click_on t("backoffice.common.edit")
      end
    end

    context "user information section" do
      context "when content is correct" do
        it "can update admin information" do
          attach_file t("simple_form.labels.user.avatar"), Rails.root.join("spec/fixtures/files/picture.jpg")
          fill_in t("simple_form.labels.user.first_name"), with: "First Name"
          fill_in t("simple_form.labels.user.last_name"), with: "Last Name"
          click_on t("backoffice.common.save")

          expect(page).to have_text(t("backoffice.messages.success_update", model: t("backoffice.common.user")))
          user.reload
          expect(user.avatar.filename.to_s).to eq("picture.jpg")
          expect(user.first_name).to eq("First Name")
          expect(user.last_name).to eq("Last Name")
        end
      end

      context "when content is incorrect" do
        it "shows validation errors" do
          fill_in t("simple_form.labels.user.first_name"), with: ""
          click_on t("backoffice.common.save")

          expect(page).to have_text(t("simple_form.error_notification.default_message"))
          expect(page).to have_text("First name can't be blank")
        end
      end
    end

    context "when removing user" do
      it "removes user" do
        accept_confirm do
          click_on t("backoffice.users.delete")
        end
        expect(page).to have_text(t("backoffice.messages.success_delete", model: t("backoffice.common.user")))
        expect(current_path).to eql(backoffice_users_path)
        expect(page).not_to have_text(user.full_name)
      end
    end
  end
end
