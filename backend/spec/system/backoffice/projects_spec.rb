require "system_helper"

RSpec.describe "Backoffice: Projects", type: :system do
  let(:admin) { create(:admin, email: "admin@example.com", password: "SuperSecret6", first_name: "Admin", last_name: "Example") }
  let(:geometry) { {type: "Polygon", coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1]]]} }
  let!(:priority_landscape) { create(:location, :with_geometry, geometry: RGeo::GeoJSON.decode(geometry.to_json), location_type: :priority_landscape, name: "Test priority landscape") }
  let!(:project) {
    create(
      :project,
      :with_involved_project_developers,
      name: "Project ultra name",
      project_developer: create(:project_developer, account: create(:account, name: "Ultra project developer name")),
      geometry: geometry,
      verified: true
    )
  }
  let!(:projects) { create_list(:project, 4) }
  let!(:draft_project) { create :project, :draft }
  let!(:open_call_application) { create :open_call_application, project: project }

  before { sign_in admin }

  describe "Index" do
    before { visit "/backoffice/projects" }

    it_behaves_like "with table pagination", expected_total: 6
    it_behaves_like "with table sorting", columns: [
      I18n.t("backoffice.common.project_name"),
      I18n.t("backoffice.common.project_developer"),
      I18n.t("backoffice.common.category"),
      I18n.t("backoffice.projects.index.priority_landscape"),
      I18n.t("backoffice.common.status")
    ]
    it_behaves_like "with csv export", file_name: "projects.csv"

    it "shows projects list" do
      expect(page).to have_xpath(".//tbody/tr", count: 6)
      within_row("Project ultra name") do
        expect(page).to have_text("Ultra project developer name")
        expect(page).to have_text(Category.find(project.category).name)
        expect(page).to have_text("Test priority landscape")
        expect(page).to have_text(I18n.t("backoffice.common.verified"))
      end
    end

    it "shows draft project" do
      expect(page).to have_text(draft_project.name)
    end

    context "when searching" do
      it "shows only found projects" do
        expect(page).to have_text(project.name)
        projects.each { |p| expect(page).to have_text(p.name) }
        fill_in :q_filter_full_text, with: project.name
        find("form.project_search button").click
        expect(page).to have_text(project.name)
        projects.each { |p| expect(page).not_to have_text(p.name) }
      end
    end

    context "when searching by ransack filter" do
      context "when filtered by verified flag" do
        before { project.update! verified: true }

        it "returns records at correct state" do
          expect(page).to have_text(project.name)
          projects.each { |p| expect(page).to have_text(p.name) }
          select t("backoffice.common.verified"), from: :q_verified_eq
          click_on t("backoffice.common.apply")
          expect(page).to have_text(project.name)
          projects.each { |p| expect(page).not_to have_text(p.name) }
        end
      end

      context "when filtered by category" do
        before { project.update! category: "human-capital-and-inclusion" }

        it "returns records at correct category" do
          expect(page).to have_text(project.name)
          projects.each { |p| expect(page).to have_text(p.name) }
          select t("enums.category.human-capital-and-inclusion.name"), from: :q_category_eq
          click_on t("backoffice.common.apply")
          expect(page).to have_text(project.name)
          projects.each { |p| expect(page).not_to have_text(p.name) }
        end
      end

      context "when filtered by priority landscape" do
        it "returns records at correct priority landscape" do
          expect(page).to have_text(project.name)
          projects.each { |p| expect(page).to have_text(p.name) }
          select priority_landscape.name, from: :q_priority_landscape_id_eq
          click_on t("backoffice.common.apply")
          expect(page).to have_text(project.name)
          projects.each { |p| expect(page).not_to have_text(p.name) }
        end
      end
    end

    context "when deleting project via menu" do
      it "deletes project" do
        within_row(project.name) do
          find("button.rounded-full").click
          expect {
            accept_confirm do
              click_on t("backoffice.common.delete")
            end
          }.to have_enqueued_mail(ProjectDeveloperMailer, :project_destroyed).with(project.project_developer, project.name)
            .and have_enqueued_mail(ProjectDeveloperMailer, :project_destroyed).with(project.involved_project_developers.first, project.name)
            .and have_enqueued_mail(InvestorMailer, :project_destroyed).with(open_call_application.investor, project.name, open_call_application.open_call)
        end
        expect(page).not_to have_text(project.name)
      end
    end

    context "when unverifying project via menu" do
      it "unverifies project" do
        within_row(project.name) do
          find("button.rounded-full").click
          click_on t("backoffice.common.unverify")
          expect(page).to have_text(I18n.t("backoffice.common.unverified"))
        end
      end
    end

    context "when verifying project via menu" do
      before do
        project.update! verified: false
        visit "/backoffice/projects"
      end

      it "verifies project" do
        within_row(project.name) do
          find("button.rounded-full").click
          click_on t("backoffice.common.verify")
          expect(page).to have_text(I18n.t("backoffice.common.verified"))
        end
      end
    end
  end

  describe "Edit" do
    let!(:country) { create :location, :with_municipalities }
    let!(:project_developer) { create :project_developer }
    let!(:extra_project_developer) { create :project_developer }

    before do
      visit "/backoffice/projects"
      within_row("Project ultra name") do
        click_on t("backoffice.common.edit")
      end
    end

    context "information section" do
      context "when content is correct" do
        it "can update project information" do
          fill_in t("simple_form.labels.project.name"), with: "New name"
          attach_file t("simple_form.labels.project.project_images"), [Rails.root.join("spec/fixtures/files/picture.jpg"), Rails.root.join("spec/fixtures/files/picture_2.jpg")]
          using_wait_time 120 do
            sleep 5
            attach_file :shapefile, Rails.root.join("spec/fixtures/files/shapefile.zip")
            expect(page).to have_text(t("backoffice.projects.form.shapefile_loaded"))
          end
          select country.name, from: t("simple_form.labels.project.country")
          select country.locations.first.name, from: t("simple_form.labels.project.department")
          select country.locations.first.locations.first.name, from: t("simple_form.labels.project.municipality")
          select project_developer.name, from: t("simple_form.labels.project.project_developer")
          select extra_project_developer.name, from: t("simple_form.labels.project.involved_project_developers")
          select t("enums.project_development_stage.scaling-up.name"), from: t("simple_form.labels.project.development_stage")
          fill_in t("simple_form.labels.project.estimated_duration_in_months"), with: 15
          select t("enums.category.human-capital-and-inclusion.name"), from: t("simple_form.labels.project.category")
          fill_in t("simple_form.labels.project.problem"), with: "New problem"
          fill_in t("simple_form.labels.project.solution"), with: "New solution"
          check t("enums.project_target_group.afro-desendant-peoples.name")
          check t("enums.project_target_group.entrepreneurs-and-innovators-startups.name")
          uncheck t("enums.project_target_group.urban-populations.name")
          fill_in t("simple_form.labels.project.expected_impact"), with: "New expected impact"
          check t("enums.impact_area.carbon-emission-reduction.name")
          check t("enums.sdg.1.name")
          check t("enums.sdg.2.name")
          uncheck t("enums.sdg.4.name")
          choose "Yes", name: "project[looking_for_funding]"
          select t("enums.ticket_size.scaling.description"), from: t("simple_form.labels.project.ticket_size")
          check t("enums.instrument_type.equity.name")
          fill_in t("simple_form.labels.project.funding_plan"), with: "New funding plan"
          choose "Yes", name: "project[received_funding]"
          fill_in t("simple_form.labels.project.received_funding_amount_usd"), with: 10000
          fill_in t("simple_form.labels.project.received_funding_investor"), with: "Investor"
          fill_in t("simple_form.labels.project.replicability"), with: "New replicability"
          fill_in t("simple_form.labels.project.sustainability"), with: "New sustainability"
          fill_in t("simple_form.labels.project.progress_impact_tracking"), with: "New progress impact tracking"
          fill_in t("simple_form.labels.project.description"), with: "New description"
          fill_in t("simple_form.labels.project.relevant_links"), with: "New relevant links"
          click_on t("backoffice.common.save")

          expect(page).to have_text(t("backoffice.messages.success_update", model: t("backoffice.common.project")))
          project.reload
          expect(project.name).to eq("New name")
          expect(project.project_images.count).to eq(2)
          expect(project.country).to eq(country)
          expect(project.department).to eq(country.locations.first)
          expect(project.municipality).to eq(country.locations.first.locations.first)
          expect(project.project_developer).to eq(project_developer)
          expect(project.involved_project_developers).to include(extra_project_developer)
          expect(project.development_stage).to eq("scaling-up")
          expect(project.estimated_duration_in_months).to eq(15)
          expect(project.category).to eq("human-capital-and-inclusion")
          expect(project.problem).to eq("New problem")
          expect(project.solution).to eq("New solution")
          expect(project.target_groups).to include("afro-desendant-peoples")
          expect(project.target_groups).to include("entrepreneurs-and-innovators-startups")
          expect(project.target_groups).not_to include("urban-populations")
          expect(project.expected_impact).to eq("New expected impact")
          expect(project.impact_areas).to include("carbon-emission-reduction")
          expect(project.sdgs).to include(1)
          expect(project.sdgs).to include(2)
          expect(project.sdgs).not_to include(4)
          expect(project.looking_for_funding).to be_truthy
          expect(project.ticket_size).to eq("scaling")
          expect(project.instrument_types).to include("equity")
          expect(project.funding_plan).to eq("New funding plan")
          expect(project.received_funding).to be_truthy
          expect(project.received_funding_amount_usd).to eq(10000)
          expect(project.received_funding_investor).to eq("Investor")
          expect(project.replicability).to eq("New replicability")
          expect(project.sustainability).to eq("New sustainability")
          expect(project.progress_impact_tracking).to eq("New progress impact tracking")
          expect(project.description).to eq("New description")
          expect(project.relevant_links).to eq("New relevant links")
          expect(project.geometry).to eq({
            type: "Feature",
            properties: {},
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -74.59716796875,
                    2.3943223575350774
                  ],
                  [
                    -75.16845703124999,
                    1.7355743631421197
                  ],
                  [
                    -74.5751953125,
                    1.252341676699629
                  ],
                  [
                    -73.80615234375,
                    1.1864386394452024
                  ],
                  [
                    -73.47656249999999,
                    1.6037944300589857
                  ],
                  [
                    -73.89404296875,
                    2.3065056838291094
                  ],
                  [
                    -74.59716796875,
                    2.3943223575350774
                  ]
                ]
              ]
            }
          }.as_json)
        end
      end

      context "when content is incorrect" do
        it "shows validation errors" do
          fill_in t("simple_form.labels.project.estimated_duration_in_months"), with: 80
          click_on t("backoffice.common.save")

          expect(page).to have_text(t("simple_form.error_notification.default_message"))
          expect(page).to have_text("Estimated duration in months must be less than 37")
        end

        it "shows validation errors for localized inputs" do
          fill_in t("simple_form.labels.project.name"), with: ""
          click_on t("backoffice.common.save")

          expect(page).to have_text(t("simple_form.error_notification.default_message"))
          expect(page).to have_text("Name can't be blank")
        end

        it "shows validation errors for wrong shapefile" do
          attach_file :shapefile, Rails.root.join("spec/fixtures/files/text_file.txt")
          expect(page).to have_text(t("backoffice.projects.form.shapefile_messages.not_supported"))
        end
      end
    end

    context "verification status section" do
      before { within_sidebar { click_on t("backoffice.projects.status") } }

      it "can update verification status" do
        expect(page).to have_checked_field("project[verified]")
        choose t("backoffice.common.unverified"), name: "project[verified]"
        click_on t("backoffice.common.save")
        expect(page).to have_text(t("backoffice.messages.success_update", model: t("backoffice.common.project")))
        expect(project.reload.verified).to be_falsey
      end
    end

    context "project developers section" do
      before { within_sidebar { click_on t("backoffice.projects.project_developers") } }

      it "shows owner information" do
        expect(page).to have_text(project.project_developer.name)
        expect(page).to have_text(ProjectDeveloperType.find(project.project_developer.project_developer_type).name)
        expect(page).to have_text(project.project_developer.contact_email)
        expect(page).to have_text(project.project_developer.contact_phone)
      end

      it "shows information about partners" do
        project.involved_project_developers.each do |project_developer|
          expect(page).to have_text(project_developer.name)
          expect(page).to have_text(ProjectDeveloperType.find(project_developer.project_developer_type).name)
          expect(page).to have_text(project_developer.contact_email)
          expect(page).to have_text(project_developer.contact_phone)
        end
      end
    end

    context "when changing translations" do
      it "saves translated content" do
        select "Spanish", from: t("backoffice.common.view_content_in")
        sleep 1 # have to wait as dunno why it does not wait for turbo to reload page
        fill_in t("simple_form.labels.project.name"), with: "New name - Spanish"
        fill_in t("simple_form.labels.project.problem"), with: "New problem - Spanish"
        fill_in t("simple_form.labels.project.solution"), with: "New solution - Spanish"
        fill_in t("simple_form.labels.project.expected_impact"), with: "New expected impact - Spanish"
        fill_in t("simple_form.labels.project.funding_plan"), with: "New funding plan - Spanish"
        fill_in t("simple_form.labels.project.replicability"), with: "New replicability - Spanish"
        fill_in t("simple_form.labels.project.sustainability"), with: "New sustainability - Spanish"
        fill_in t("simple_form.labels.project.progress_impact_tracking"), with: "New progress impact tracking - Spanish"
        fill_in t("simple_form.labels.project.description"), with: "New description - Spanish"
        fill_in t("simple_form.labels.project.relevant_links"), with: "New relevant links - Spanish"
        click_on t("backoffice.common.save")

        expect(page).to have_text(t("backoffice.messages.success_update", model: t("backoffice.common.project")))
        project.reload
        expect(project.name_es).to eq("New name - Spanish")
        expect(project.problem_es).to eq("New problem - Spanish")
        expect(project.solution_es).to eq("New solution - Spanish")
        expect(project.expected_impact_es).to eq("New expected impact - Spanish")
        expect(project.funding_plan_es).to eq("New funding plan - Spanish")
        expect(project.replicability_es).to eq("New replicability - Spanish")
        expect(project.sustainability_es).to eq("New sustainability - Spanish")
        expect(project.progress_impact_tracking_es).to eq("New progress impact tracking - Spanish")
        expect(project.description_es).to eq("New description - Spanish")
        expect(project.relevant_links_es).to eq("New relevant links - Spanish")
      end
    end

    context "when removing project" do
      it "removes project" do
        expect {
          accept_confirm do
            click_on t("backoffice.projects.delete")
          end
        }.to have_enqueued_mail(ProjectDeveloperMailer, :project_destroyed).with(project.project_developer, project.name)
          .and have_enqueued_mail(ProjectDeveloperMailer, :project_destroyed).with(project.involved_project_developers.first, project.name)
          .and have_enqueued_mail(InvestorMailer, :project_destroyed).with(open_call_application.investor, project.name, open_call_application.open_call)
        expect(page).to have_text(t("backoffice.messages.success_delete", model: t("backoffice.common.project")))
        expect(current_path).to eql(backoffice_projects_path)
        expect(page).not_to have_text(project.name)
      end
    end
  end
end
