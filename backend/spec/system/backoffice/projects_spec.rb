require "system_helper"

RSpec.describe "Backoffice: Projects", type: :system do
  let(:admin) { create(:admin, email: "admin@example.com", password: "SuperSecret6", first_name: "Admin", last_name: "Example") }
  let(:geometry) { {type: "Polygon", coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1]]]} }
  let!(:priority_landscape) { create(:location, :with_geometry, geometry: RGeo::GeoJSON.decode(geometry.to_json), location_type: "region", name: "Test priority landscape") }
  let!(:project) {
    create(
      :project,
      name: "Project ultra name",
      project_developer: create(:project_developer, account: create(:account, name: "Ultra project developer name")),
      geometry: geometry,
      trusted: true
    )
  }
  let!(:projects) { create_list(:project, 4) }

  before { sign_in admin }

  describe "Index" do
    before { visit "/backoffice/projects" }

    it_behaves_like "with table pagination"
    it_behaves_like "with table sorting", columns: [
      I18n.t("backoffice.common.project_name"),
      I18n.t("backoffice.common.project_developer"),
      I18n.t("backoffice.common.category"),
      I18n.t("backoffice.projects.index.priority_landscape"),
      I18n.t("backoffice.common.status")
    ]

    it "shows projects list" do
      expect(page).to have_xpath(".//tbody/tr", count: 5)
      within_row("Project ultra name") do
        expect(page).to have_text("Ultra project developer name")
        expect(page).to have_text(Category.find(project.category).name)
        expect(page).to have_text("Test priority landscape")
        expect(page).to have_text(I18n.t("backoffice.common.verified"))
      end
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
      context "when filtered by state" do
        before { project.published! }

        it "returns records at correct state" do
          expect(page).to have_text(project.name)
          projects.each { |p| expect(page).to have_text(p.name) }
          select t("enums.project_status.published.name"), from: :q_status_eq
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
  end
end
