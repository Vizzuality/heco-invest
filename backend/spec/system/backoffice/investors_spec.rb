require "system_helper"

RSpec.describe "Backoffice: Investors", type: :system do
  let(:admin) { create(:admin, email: "admin@example.com", password: "SuperSecret6", first_name: "Admin", last_name: "Example") }
  let(:approved_investor_owner) { create(:user, :investor, first_name: "Tom", last_name: "Higgs") }
  let(:unapproved_investor_owner) { create(:user, :investor, first_name: "John", last_name: "Levis") }
  let!(:approved_investor) {
    create(
      :investor,
      investor_type: "family-office",
      account: build(
        :account,
        :approved,
        name: "Super Investor Enterprise",
        about: "About Investor Enterprise account",
        owner: approved_investor_owner,
        users: [approved_investor_owner]
      ),
      previously_invested: true,
      categories: %w[forestry-and-agroforestry non-timber-forest-production],
      ticket_sizes: %w[validation],
      instrument_types: %w[grant loan],
      impacts: %w[climate water],
      sdgs: [1, 3, 5],
      mission: "Some example mission",
      language: "en"
    )
  }
  let!(:unapproved_investor) {
    create(
      :investor,
      account: build(
        :account,
        :unapproved,
        name: "Unapproved Investor Enterprise",
        owner: unapproved_investor_owner,
        users: [unapproved_investor_owner]
      )
    )
  }

  before { sign_in admin }

  describe "Index" do
    before { visit "/backoffice/investors" }

    it_behaves_like "with table pagination", expected_total: 2
    it_behaves_like "with table sorting", columns: [
      I18n.t("backoffice.common.account_name"),
      I18n.t("backoffice.common.account_owner"),
      I18n.t("backoffice.common.contact_email"),
      I18n.t("backoffice.common.contact_phone"),
      I18n.t("backoffice.common.account_users"),
      I18n.t("backoffice.investors.index.open_calls"),
      I18n.t("backoffice.common.language"),
      I18n.t("backoffice.common.status")
    ]
    it_behaves_like "with csv export", file_name: "investors.csv"

    it "shows investors list" do
      within_row("Super Investor Enterprise") do
        expect(page).to have_text("Tom Higgs")
        expect(page).to have_text(ReviewStatus.find("approved").name)
        expect(page).to have_text(approved_investor.contact_email)
        expect(page).to have_text(approved_investor.contact_phone)
      end
      within_row("Unapproved Investor Enterprise") do
        expect(page).to have_text("John Levis")
        expect(page).to have_text(ReviewStatus.find("unapproved").name)
      end
    end

    context "when approving investor" do
      it "flips the status to approved" do
        within_row("Unapproved Investor Enterprise") do
          expect(page).to have_text("John Levis")
          expect(page).to have_text(ReviewStatus.find("unapproved").name)
          expect {
            click_on t("backoffice.common.approve")
          }.to have_enqueued_mail(UserMailer, :approved).with(unapproved_investor_owner).once
          expect(page).to have_text(ReviewStatus.find("approved").name)
        end
      end

      context "when account language is different" do
        before do
          I18n.with_locale "pt" do
            unapproved_investor.account.update! language: "pt", about_pt: "ABOUT PT", about_en: ""
          end
        end

        it "still flips the status to approved" do
          within_row(unapproved_investor.name) do
            expect(page).to have_text(ReviewStatus.find("unapproved").name)
            click_on t("backoffice.common.approve")
            expect(page).to have_text(ReviewStatus.find("approved").name)
          end
        end
      end
    end

    context "when rejecting investor" do
      it "flips status to rejected" do
        within_row("Super Investor Enterprise") do
          expect(page).to have_text("Tom Higgs")
          expect(page).to have_text(ReviewStatus.find("approved").name)
          expect {
            click_on t("backoffice.common.reject")
          }.to have_enqueued_mail(UserMailer, :rejected).with(approved_investor_owner).once
          expect(page).to have_text(ReviewStatus.find("rejected").name)
        end
      end

      context "when account language is different" do
        before do
          I18n.with_locale "pt" do
            approved_investor.account.update! language: "pt", about_pt: "ABOUT PT", about_en: ""
          end
        end

        it "still flips the status to rejected" do
          within_row(approved_investor.name) do
            expect(page).to have_text(ReviewStatus.find("approved").name)
            click_on t("backoffice.common.reject")
            expect(page).to have_text(ReviewStatus.find("rejected").name)
          end
        end
      end
    end

    context "when searching by name" do
      it "shows only found investors" do
        expect(page).to have_text("Super Investor Enterprise")
        expect(page).to have_text("Unapproved Investor Enterprise")
        fill_in :q_filter_full_text, with: "Super Investor Enterprise"
        find("form.investor_search button").click
        expect(page).to have_text("Super Investor Enterprise")
        expect(page).not_to have_text("Unapproved Investor Enterprise")
      end
    end

    context "when searching by partial name" do
      it "shows only found investors" do
        expect(page).to have_text("Super Investor Enterprise")
        expect(page).to have_text("Unapproved Investor Enterprise")
        fill_in :q_filter_full_text, with: "Enter"
        find("form.investor_search button").click
        expect(page).to have_text("Super Investor Enterprise")
        expect(page).to have_text("Unapproved Investor Enterprise")
      end
    end

    context "when searching by ransack filter" do
      it "returns records at correct state" do
        expect(page).to have_text(approved_investor.name)
        expect(page).to have_text(unapproved_investor.name)
        select ReviewStatus.find("approved").name, from: :q_account_review_status_eq
        click_on t("backoffice.common.apply")
        expect(page).to have_text(approved_investor.name)
        expect(page).not_to have_text(unapproved_investor.name)
      end
    end
  end

  describe "Edit" do
    before do
      visit "/backoffice/investors"
      within_row("Super Investor Enterprise") do
        click_on t("backoffice.common.edit")
      end
    end

    context "account language section" do
      before { within_sidebar { click_on t("backoffice.account.account_language") } }

      context "when new language has all text translated" do
        before do
          approved_investor.account.update! about_es: "ES"
          approved_investor.update! other_information_es: "ES", mission_es: "ES", prioritized_projects_description: "ES"
        end

        it "can update account language" do
          expect(page).to have_select(t("simple_form.labels.account.language"), selected: "English")
          select "Spanish", from: t("simple_form.labels.account.language")
          click_on t("backoffice.common.save")
          expect(page).to have_text(t("backoffice.messages.success_update", model: t("backoffice.common.investor")))
          expect(approved_investor.account.reload.language).to eq("es")
        end
      end

      context "when new language is missing some translations" do
        it "cannot update account language" do
          expect(page).to have_select(t("simple_form.labels.account.language"), selected: "English")
          select "Spanish", from: t("simple_form.labels.account.language")
          click_on t("backoffice.common.save")
          expect(page).to have_text(t("simple_form.error_notification.default_message"))
          expect(page).to have_text("Account about can't be blank")
          expect(page).to have_text("Mission can't be blank")
        end
      end
    end

    context "approval status section" do
      before { within_sidebar { click_on t("backoffice.account.approval_status") } }

      it "can update approval status" do
        expect(page).to have_select(t("simple_form.labels.account.review_status"), selected: ReviewStatus.find("approved").name)
        select "Unapproved", from: t("simple_form.labels.account.review_status")
        click_on t("backoffice.common.save")
        expect(page).to have_text(t("backoffice.messages.success_update", model: t("backoffice.common.investor")))
        expect(approved_investor.account.reload.review_status).to eq("unapproved")
      end
    end

    context "profile section" do
      context "when content is correct" do
        it "can update profile information" do
          attach_file t("simple_form.labels.account.picture"), Rails.root.join("spec/fixtures/files/picture_2.jpg")
          fill_in t("simple_form.labels.account.name"), with: "New profile name"
          select t("enums.investor_type.angel-investor.name"), from: t("simple_form.labels.investor.investor_type")
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
          uncheck t("enums.ticket_size.validation.name")
          check t("enums.ticket_size.small-grants.name")
          check t("enums.ticket_size.scaling.name")
          uncheck t("enums.instrument_type.grant.name")
          uncheck t("simple_form.labels.investor.previously_invested")
          check t("enums.impact.community.name")
          uncheck t("enums.impact.water.name")
          uncheck t("enums.impact.climate.name")
          uncheck t("enums.sdg.5.name")
          check t("enums.sdg.2.name")
          click_on t("backoffice.common.save")

          expect(page).to have_text(t("backoffice.messages.success_update", model: t("backoffice.common.investor")))
          approved_investor.reload
          expect(approved_investor.account.picture.filename.to_s).to eq("picture_2.jpg")
          expect(page).to have_css "form a img", count: 1
          expect(approved_investor.account.name).to eq("New profile name")
          expect(approved_investor.investor_type).to eq("angel-investor")
          expect(approved_investor.account.about).to eq("New about description")
          expect(approved_investor.mission).to eq("New mission")
          expect(approved_investor.account.website).to eq("http://new-example.com")
          expect(approved_investor.account.contact_phone).to eq("+48123123123")
          expect(approved_investor.account.contact_email).to eq("newemail@example.com")
          expect(approved_investor.account.linkedin).to eq("https://linkedin.com/new-profile")
          expect(approved_investor.account.instagram).to eq("https://instagram.com/new-profile")
          expect(approved_investor.account.facebook).to eq("https://facebook.com/new-profile")
          expect(approved_investor.account.twitter).to eq("https://twitter.com/new-profile")
          expect(approved_investor.previously_invested).to eq(false)
          expect(approved_investor.categories.sort).to eq(%w[non-timber-forest-production tourism-and-recreation])
          expect(approved_investor.ticket_sizes.sort).to eq(%w[scaling small-grants])
          expect(approved_investor.instrument_types).to eq(%w[loan])
          expect(approved_investor.sdgs.sort).to eq([1, 2, 3])
          expect(approved_investor.impacts).to eq(%w[community])
        end
      end

      context "when content is incorrect" do
        it "shows validation errors" do
          fill_in t("simple_form.labels.account.name"), with: ""
          click_on t("backoffice.common.save")

          expect(page).to have_text(t("simple_form.error_notification.default_message"))
          expect(page).to have_text("Name can't be blank")
        end
      end

      context "when changing translations" do
        it "saves translated content" do
          select "Spanish", from: t("backoffice.common.view_content_in")
          sleep 1 # have to wait as dunno why it does not wait for turbo to reload page
          fill_in t("simple_form.labels.account.about"), with: "New about description - Spanish"
          fill_in t("simple_form.labels.defaults.mission"), with: "New mission - Spanish"
          fill_in t("simple_form.labels.investor.prioritized_projects_description"), with: "New prioritized projects - Spanish"
          fill_in t("simple_form.labels.investor.other_information"), with: "New other info - Spanish"
          click_on t("backoffice.common.save")

          expect(page).to have_text(t("backoffice.messages.success_update", model: t("backoffice.common.investor")))
          approved_investor.reload
          expect(approved_investor.account.about_es).to eq("New about description - Spanish")
          expect(approved_investor.mission_es).to eq("New mission - Spanish")
          expect(approved_investor.prioritized_projects_description_es).to eq("New prioritized projects - Spanish")
          expect(approved_investor.other_information_es).to eq("New other info - Spanish")
        end
      end

      context "account owner section" do
        let!(:new_user) { create :user, account: approved_investor.account }

        before { within_sidebar { click_on t("backoffice.common.account_owner") } }

        it "updates account owner" do
          select new_user.full_name, from: t("simple_form.labels.account.owner_id")
          click_on t("backoffice.common.save")

          expect(page).to have_text(t("backoffice.messages.success_update", model: t("backoffice.common.investor")))
          approved_investor.reload
          expect(approved_investor.owner).to eq(new_user)
        end
      end

      context "when removing account" do
        it "removes investor" do
          expect {
            accept_confirm do
              click_on t("backoffice.account.delete")
            end
          }.to have_enqueued_mail(UserMailer, :destroyed).with(approved_investor.owner.email, approved_investor.owner.full_name, approved_investor.owner.locale)
          expect(page).to have_text(t("backoffice.messages.success_delete", model: t("backoffice.common.investor")))
          expect(current_path).to eql(backoffice_investors_path)
          expect(page).not_to have_text(approved_investor.name)
          expect(Account.find_by(id: approved_investor.account_id)).to be_nil
        end
      end
    end
  end
end
