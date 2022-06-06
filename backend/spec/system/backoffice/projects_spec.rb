require "system_helper"

RSpec.describe "Backoffice: Projects", type: :system do
  let(:admin) { create(:admin, email: "admin@example.com", password: "SuperSecret6", first_name: "Admin", last_name: "Example") }
  let(:geometry) { {type: "Polygon", coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1]]]} }
  let!(:mosaic) { create(:location, :with_geometry, geometry: RGeo::GeoJSON.decode(geometry.to_json), location_type: "region", name: "Test mosaic") }
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
      I18n.t("backoffice.common.mosaic"),
      I18n.t("backoffice.common.status")
    ]

    it "shows projects list" do
      expect(page).to have_xpath(".//tbody/tr", count: 5)
      within_row("Project ultra name") do
        expect(page).to have_text("Ultra project developer name")
        expect(page).to have_text(Category.find(project.category).name)
        expect(page).to have_text("Test mosaic")
        expect(page).to have_text(I18n.t("backoffice.common.verified"))
      end
    end
  end
end
