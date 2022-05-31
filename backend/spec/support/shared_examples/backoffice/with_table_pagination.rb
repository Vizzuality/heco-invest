RSpec.shared_examples "with table pagination" do
  describe "Paginated" do
    it "shows page navigation" do
      expect(page).to have_text(t("backoffice.common.navigation.prev"))
      expect(page).to have_text(t("backoffice.common.navigation.next"))
    end
  end
end
