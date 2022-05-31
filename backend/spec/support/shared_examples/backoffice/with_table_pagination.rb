RSpec.shared_examples "with table pagination" do
  describe "Paginated" do
    it "shows page navigation" do
      within ".pagination .active" do
        expect(page).to have_text("1")
      end
    end
  end
end
