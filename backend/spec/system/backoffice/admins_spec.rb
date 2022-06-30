require "system_helper"

RSpec.describe "Backoffice: Admins", type: :system do
  let!(:admin) { create(:admin, email: "admin@example.com", password: "SuperSecret6", first_name: "Admin", last_name: "Example") }
  let!(:extra_admin) { create(:admin) }

  before { sign_in admin }

  describe "Index" do
    before { visit "/backoffice/admins" }

    it_behaves_like "with table pagination", expected_total: 2
    it_behaves_like "with table sorting", columns: [
      I18n.t("backoffice.common.name"),
      I18n.t("backoffice.common.email"),
      I18n.t("backoffice.common.created_at"),
      I18n.t("backoffice.admins.index.last_sign_in_at")
    ]
    it_behaves_like "with csv export", file_name: "admins.csv"

    it "shows admins list" do
      within_row(admin.full_name) do
        expect(page).to have_text(admin.email)
        expect(page).to have_text(I18n.l(admin.created_at.to_date))
        expect(page).to have_text(I18n.l(admin.last_sign_in_at&.to_date, default: ""))
      end
      within_row(extra_admin.full_name) do
        expect(page).to have_text(extra_admin.email)
        expect(page).to have_text(I18n.l(extra_admin.created_at.to_date))
        expect(page).to have_text(I18n.l(extra_admin.last_sign_in_at&.to_date, default: ""))
      end
    end

    context "when searching" do
      it "shows only found admins" do
        expect(page).to have_text(admin.full_name)
        expect(page).to have_text(extra_admin.full_name)
        fill_in :q_filter_full_text, with: admin.full_name
        find("form.admin_search button").click
        expect(page).to have_text(admin.full_name)
        expect(page).not_to have_text(extra_admin.full_name)
      end
    end
  end

  describe "New" do
    let(:new_admin) { Admin.last }

    before do
      visit "/backoffice/admins"
      click_on t("backoffice.admins.index.new")
    end

    context "when content is correct" do
      it "creates new admin" do
        fill_in t("simple_form.labels.admin.first_name"), with: "First Name"
        fill_in t("simple_form.labels.admin.last_name"), with: "Last Name"
        fill_in t("simple_form.labels.admin.email"), with: "user@example.com"
        expect {
          click_on t("backoffice.common.save")
        }.to have_enqueued_mail(AdminMailer, :first_time_login_instructions).once

        expect(page).to have_text(t("backoffice.messages.success_create", model: t("backoffice.common.admin")))
        expect(new_admin.first_name).to eq("First Name")
        expect(new_admin.last_name).to eq("Last Name")
        expect(new_admin.email).to eq("user@example.com")
        expect(new_admin.encrypted_password).not_to be_blank
        expect(new_admin.ui_language).to eq(admin.ui_language)
      end
    end

    context "when content is incorrect" do
      it "shows validation errors" do
        fill_in t("simple_form.labels.admin.first_name"), with: ""
        click_on t("backoffice.common.save")

        expect(page).to have_text(t("simple_form.error_notification.default_message"))
        expect(page).to have_text("First name can't be blank")
      end
    end
  end
end
