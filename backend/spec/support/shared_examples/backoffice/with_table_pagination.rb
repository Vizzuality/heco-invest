RSpec.shared_examples "with table pagination" do |expected_total:|
  describe "Paginated" do
    it "shows page navigation" do
      within ".pagination .active" do
        expect(page).to have_text("1")
      end
    end

    it "shows total number of records" do
      within "div.pagination-total-number" do
        expect(page).to have_text(t("backoffice.common.total"))
        expect(page).to have_text(expected_total)
      end
    end
  end
end
