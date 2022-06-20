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

    it_behaves_like "with table pagination", expected_total: 2
    it_behaves_like "with table sorting", columns: [
      I18n.t("backoffice.common.name"),
      I18n.t("backoffice.common.account_owner"),
      I18n.t("backoffice.common.contact_email"),
      I18n.t("backoffice.common.contact_phone"),
      I18n.t("backoffice.common.account_users"),
      I18n.t("backoffice.project_developers.index.projects"),
      I18n.t("backoffice.common.language"),
      I18n.t("backoffice.common.status")
    ]
    it_behaves_like "with csv export", file_name: "project_developers.csv"

    it "shows project developers list" do
      within_row("Super PD Enterprise") do
        expect(page).to have_text("Tom Higgs")
        expect(page).to have_text(ReviewStatus.find("approved").name)
        expect(page).to have_text(approved_pd.contact_email)
        expect(page).to have_text(approved_pd.contact_phone)
      end
      within_row("Unapproved PD Enterprise") do
        expect(page).to have_text("John Levis")
        expect(page).to have_text(ReviewStatus.find("unapproved").name)
      end
    end

    context "when approving project developer" do
      it "flips the status to approved" do
        within_row("Unapproved PD Enterprise") do
          expect(page).to have_text("John Levis")
          expect(page).to have_text(ReviewStatus.find("unapproved").name)
          expect {
            click_on t("backoffice.common.approve")
          }.to have_enqueued_mail(UserMailer, :approved).with(unapproved_pd_owner).once
          expect(page).to have_text(ReviewStatus.find("approved").name)
        end
      end
    end

    context "when rejecting project developer" do
      it "flips status to rejected" do
        within_row("Super PD Enterprise") do
          expect(page).to have_text("Tom Higgs")
          expect(page).to have_text(ReviewStatus.find("approved").name)
          expect {
            click_on t("backoffice.common.reject")
          }.to have_enqueued_mail(UserMailer, :rejected).with(approved_pd_owner).once
          expect(page).to have_text(ReviewStatus.find("rejected").name)
        end
      end
    end

    context "when searching" do
      it "shows only found project developers" do
        expect(page).to have_text("Super PD Enterprise")
        expect(page).to have_text("Unapproved PD Enterprise")
        fill_in :q_filter_full_text, with: "Super PD Enterprise"
        find("form.project_developer_search button").click
        expect(page).to have_text("Super PD Enterprise")
        expect(page).not_to have_text("Unapproved PD Enterprise")
      end
    end

    context "when searching by ransack filter" do
      it "returns records at correct state" do
        expect(page).to have_text(approved_pd.name)
        expect(page).to have_text(unapproved_pd.name)
        select ReviewStatus.find("approved").name, from: :q_account_review_status_eq
        click_on t("backoffice.common.apply")
        expect(page).to have_text(approved_pd.name)
        expect(page).not_to have_text(unapproved_pd.name)
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
        expect(page).to have_select(t("simple_form.labels.account.review_status"), selected: ReviewStatus.find("approved").name)
        select "Unapproved", from: t("simple_form.labels.account.review_status")
        click_on t("backoffice.common.save")
        expect(page).to have_text(t("backoffice.messages.success_update", model: t("backoffice.common.project_developer")))
        expect(approved_pd.account.reload.review_status).to eq("unapproved")
      end
    end

    context "profile section" do
      context "when content is correct" do
        it "can update profile information" do
          attach_file t("simple_form.labels.account.picture"), Rails.root.join("spec/fixtures/files/picture_2.jpg")
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
          expect(approved_pd.account.picture.filename.to_s).to eq("picture_2.jpg")
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

      context "when content is incorrect" do
        it "shows validation errors" do
          fill_in t("simple_form.labels.account.name"), with: ""
          fill_in t("simple_form.labels.project_developer.entity_legal_registration_number"), with: ""
          click_on t("backoffice.common.save")

          expect(page).to have_text(t("simple_form.error_notification.default_message"))
          expect(page).to have_text("Name can't be blank")
          expect(page).to have_text("Entity legal registration number can't be blank")
        end
      end

      context "when changing translations" do
        it "saves translated content" do
          select "Spanish", from: t("backoffice.common.view_content_in")
          sleep 1 # have to wait as dunno why it does not wait for turbo to reload page
          fill_in t("simple_form.labels.account.about"), with: "New about description - Spanish"
          fill_in t("simple_form.labels.defaults.mission"), with: "New mission - Spanish"
          click_on t("backoffice.common.save")

          expect(page).to have_text(t("backoffice.messages.success_update", model: t("backoffice.common.project_developer")))
          approved_pd.reload
          expect(approved_pd.account.about_es).to eq("New about description - Spanish")
          expect(approved_pd.mission_es).to eq("New mission - Spanish")
        end
      end
    end

    context "when removing account" do
      it "removes project developer" do
        accept_confirm do
          click_on t("backoffice.account.delete")
        end
        expect(page).to have_text(t("backoffice.messages.success_delete", model: t("backoffice.common.project_developer")))
        expect(current_path).to eql(backoffice_project_developers_path)
        expect(page).not_to have_text(approved_pd.name)
      end
    end
  end
end
