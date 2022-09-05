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
          fill_in :q_name_or_investor_account_name_or_country_name_or_department_name_or_municipality_name_i_cont, with: open_call.name
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

    context "when deleting open call via menu" do
      it "deletes open call" do
        within_row(open_call.name) do
          find("button.rounded-full").click
          expect {
            accept_confirm do
              click_on t("backoffice.common.delete")
            end
          }.to have_enqueued_mail(InvestorMailer, :open_call_destroyed).with(open_call.investor, open_call.name)
        end
        expect(page).not_to have_text(open_call.name)
      end
    end

    context "when unverifying open call via menu" do
      it "unverifies open call" do
        within_row(open_call.name) do
          find("button.rounded-full").click
          click_on t("backoffice.common.unverify")
          expect(page).to have_text(I18n.t("backoffice.common.unverified"))
        end
      end
    end

    context "when verifying open call via menu" do
      before do
        open_call.update! trusted: false
        visit "/backoffice/open_calls"
      end

      it "verifies open call" do
        within_row(open_call.name) do
          find("button.rounded-full").click
          click_on t("backoffice.common.verify")
          expect(page).to have_text(I18n.t("backoffice.common.verified"))
        end
      end
    end
  end

  describe "Edit" do
    let!(:country) { create :location, :with_municipalities }
    let!(:investor) { create :investor }

    before do
      visit "/backoffice/open_calls"
      within_row("Open Call ultra name") do
        click_on t("backoffice.common.edit")
      end
    end

    context "information section" do
      context "when content is correct" do
        let(:closing_at) { 10.days.from_now.to_date }

        it "can update open call information" do
          fill_in t("simple_form.labels.open_call.name"), with: "New name"
          attach_file t("simple_form.labels.open_call.picture"), Rails.root.join("spec/fixtures/files/picture.jpg")
          select country.name, from: t("simple_form.labels.open_call.country_id")
          select country.locations.first.name, from: t("simple_form.labels.open_call.department_id")
          select country.locations.first.locations.first.name, from: t("simple_form.labels.open_call.municipality_id")
          fill_in t("simple_form.labels.open_call.description"), with: "New description"
          select investor.name, from: t("simple_form.labels.open_call.investor_id")
          fill_in t("simple_form.labels.open_call.impact_description"), with: "New impact description"
          check t("enums.sdg.1.name")
          check t("enums.sdg.2.name")
          uncheck t("enums.sdg.4.name")
          fill_in t("simple_form.labels.open_call.maximum_funding_per_project"), with: 10_000
          check t("enums.instrument_type.equity.name")
          check t("enums.instrument_type.grant.name")
          uncheck t("enums.instrument_type.loan.name")
          fill_in t("simple_form.labels.open_call.funding_priorities"), with: "New funding priorities"
          fill_in t("simple_form.labels.open_call.funding_exclusions"), with: "New funding exclusions"
          fill_in "open_call[closing_at]", with: closing_at
          click_on t("backoffice.common.save")

          expect(page).to have_text(t("backoffice.messages.success_update", model: t("backoffice.common.open_call")))
          open_call.reload
          expect(open_call.name).to eq("New name")
          expect(open_call.picture).to be_attached
          expect(open_call.country).to eq(country)
          expect(open_call.department).to eq(country.locations.first)
          expect(open_call.municipality).to eq(country.locations.first.locations.first)
          expect(open_call.description).to eq("New description")
          expect(open_call.investor).to eq(investor)
          expect(open_call.impact_description).to eq("New impact description")
          expect(open_call.sdgs).to include(1)
          expect(open_call.sdgs).to include(2)
          expect(open_call.sdgs).not_to include(4)
          expect(open_call.maximum_funding_per_project).to eq(10_000)
          expect(open_call.instrument_types).to include("equity")
          expect(open_call.instrument_types).to include("grant")
          expect(open_call.instrument_types).not_to include("loan")
          expect(open_call.funding_priorities).to eq("New funding priorities")
          expect(open_call.funding_exclusions).to eq("New funding exclusions")
          expect(open_call.closing_at).to eq(closing_at)
        end
      end

      context "when content is incorrect" do
        it "shows validation errors" do
          fill_in t("simple_form.labels.open_call.maximum_funding_per_project"), with: -10
          click_on t("backoffice.common.save")

          expect(page).to have_text(t("simple_form.error_notification.default_message"))
          expect(page).to have_text("Maximum funding per project must be greater than 0")
        end
      end
    end

    context "verification status section" do
      before { within_sidebar { click_on t("backoffice.open_calls.status") } }

      it "can update verification status" do
        expect(page).to have_checked_field("open_call[trusted]")
        choose t("backoffice.common.unverified"), name: "open_call[trusted]"
        click_on t("backoffice.common.save")
        expect(page).to have_text(t("backoffice.messages.success_update", model: t("backoffice.common.open_call")))
        expect(open_call.reload.trusted).to be_falsey
      end
    end

    context "investor section" do
      before { within_sidebar { click_on t("backoffice.open_calls.investor") } }

      it "shows owner information" do
        expect(page).to have_text(t("backoffice.open_calls.investor_description"))
        expect(page).to have_text(open_call.investor.name)
        expect(page).to have_text(InvestorType.find(open_call.investor.investor_type).name)
        expect(page).to have_text(open_call.investor.contact_email)
        expect(page).to have_text(open_call.investor.contact_phone)
      end
    end

    context "when changing translations" do
      it "saves translated content" do
        select "Spanish", from: t("backoffice.common.view_content_in")
        sleep 1 # have to wait as dunno why it does not wait for turbo to reload page
        fill_in t("simple_form.labels.open_call.name"), with: "New name - Spanish"
        fill_in t("simple_form.labels.open_call.description"), with: "New description - Spanish"
        fill_in t("simple_form.labels.open_call.impact_description"), with: "New impact description - Spanish"
        fill_in t("simple_form.labels.open_call.funding_priorities"), with: "New funding priorities - Spanish"
        fill_in t("simple_form.labels.open_call.funding_exclusions"), with: "New funding exclusions - Spanish"
        click_on t("backoffice.common.save")

        expect(page).to have_text(t("backoffice.messages.success_update", model: t("backoffice.common.open_call")))
        open_call.reload
        expect(open_call.name_es).to eq("New name - Spanish")
        expect(open_call.description_es).to eq("New description - Spanish")
        expect(open_call.impact_description_es).to eq("New impact description - Spanish")
        expect(open_call.funding_priorities_es).to eq("New funding priorities - Spanish")
        expect(open_call.funding_exclusions_es).to eq("New funding exclusions - Spanish")
      end
    end

    context "when removing open call" do
      it "removes open call" do
        expect {
          accept_confirm do
            click_on t("backoffice.open_calls.delete")
          end
        }.to have_enqueued_mail(InvestorMailer, :open_call_destroyed).with(open_call.investor, open_call.name)
        expect(page).to have_text(t("backoffice.messages.success_delete", model: t("backoffice.common.open_call")))
        expect(current_path).to eql(backoffice_open_calls_path)
        expect(page).not_to have_text(open_call.name)
      end
    end
  end
end
