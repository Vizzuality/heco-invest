require "system_helper"

RSpec.describe "Backoffice: Project Developers", type: :system do
  let(:admin) { create(:admin, email: "admin@example.com", password: "SuperSecret6", first_name: "Admin", last_name: "Example") }
  let(:approved_pd_owner) { create(:user, :project_developer, first_name: "Tom", last_name: "Higgs") }
  let(:unapproved_pd_owner) { create(:user, :project_developer, first_name: "John", last_name: "Levis") }
  let!(:approved_pd) {
    create(
      :project_developer,
      account: build(
        :account,
        :approved,
        name: "Super PD Enterprise",
        about: "About PD Enterprise account",
        owner: approved_pd_owner
      ),
      categories: %w[forestry-and-agroforestry non-timber-forest-production],
      impacts: %w[climate water],
      mosaics: %w[amazonian-piedmont-massif],
      mission: "Some example mission",
      entity_legal_registration_number: "564823570",
      language: "en"
    )
  }
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
      before { within_sidebar { click_on t("backoffice.account.account_language") } }

      it "can update account language" do
        expect(page).to have_select(t("simple_form.labels.account.language"), selected: "English")
        select "Spanish", from: t("simple_form.labels.account.language")
        click_on t("backoffice.common.save")
        expect(page).to have_text(t("backoffice.messages.success_update", model: t("backoffice.common.project_developer")))
        expect(approved_pd.account.reload.language).to eq("es")
      end
    end

    context "approval status section" do
      before { within_sidebar { click_on t("backoffice.account.approval_status") } }

      it "can update approval status" do
        expect(page).to have_select(t("simple_form.labels.account.review_status"), selected: "Approved")
        select "Unapproved", from: t("simple_form.labels.account.review_status")
        click_on t("backoffice.common.save")
        expect(page).to have_text(t("backoffice.messages.success_update", model: t("backoffice.common.project_developer")))
        expect(approved_pd.account.reload.review_status).to eq("unapproved")
      end
    end

    context "profile section" do
      context "when content is correct" do
        it "can update profile information" do
          fill_in t("simple_form.labels.account.name"), with: "New profile name"
          select t("enums.project_developer_type.academic.name"), from: t("simple_form.labels.project_developer.project_developer_type")
          fill_in t("simple_form.labels.project_developer.entity_legal_registration_number"), with: "1111111111"
          fill_in t("simple_form.labels.account.about"), with: "New about description"
          fill_in t("simple_form.labels.defaults.mission"), with: "New mission"
          fill_in t("simple_form.labels.account.website"), with: "http://new-example.com"
          fill_in t("simple_form.labels.account.contact_phone"), with: "+48123123123"
          fill_in t("simple_form.labels.account.contact_email"), with: "newemail@example.com"
          fill_in "Linkedin", with: "https://linkedin.com/new-profile"
          fill_in "Instagram", with: "https://instagram.com/new-profile"
          fill_in "Facebook", with: "https://facebook.com/new-profile"
          fill_in "Twitter", with: "https://twitter.com/new-profile"
          check t("enums.category.tourism-and-recreation.name")
          uncheck t("enums.category.forestry-and-agroforestry.name")
          check t("enums.impact.community.name")
          uncheck t("enums.impact.water.name")
          uncheck t("enums.impact.climate.name")
          check t("enums.mosaic.amazon-heart.name")
          click_on t("backoffice.common.save")

          expect(page).to have_text(t("backoffice.messages.success_update", model: t("backoffice.common.project_developer")))
          approved_pd.reload
          expect(approved_pd.account.name).to eq("New profile name")
          expect(approved_pd.project_developer_type).to eq("academic")
          expect(approved_pd.entity_legal_registration_number).to eq("1111111111")
          expect(approved_pd.account.about).to eq("New about description")
          expect(approved_pd.mission).to eq("New mission")
          expect(approved_pd.account.website).to eq("http://new-example.com")
          expect(approved_pd.account.contact_phone).to eq("+48123123123")
          expect(approved_pd.account.contact_email).to eq("newemail@example.com")
          expect(approved_pd.account.linkedin).to eq("https://linkedin.com/new-profile")
          expect(approved_pd.account.instagram).to eq("https://instagram.com/new-profile")
          expect(approved_pd.account.facebook).to eq("https://facebook.com/new-profile")
          expect(approved_pd.account.twitter).to eq("https://twitter.com/new-profile")
          expect(approved_pd.categories.sort).to eq(%w[non-timber-forest-production tourism-and-recreation])
          expect(approved_pd.impacts).to eq(%w[community])
          expect(approved_pd.mosaics.sort).to eq(%w[amazon-heart amazonian-piedmont-massif])
        end
      end

      # context "when content is incorrect" do
      #   it "shows validation errors" do

      #   end
      # end
    end
  end
end
