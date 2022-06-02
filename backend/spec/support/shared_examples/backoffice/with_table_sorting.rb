RSpec.shared_examples "with table sorting" do |columns: []|
  describe "Sortable" do
    it "has correct sortable columns" do
      columns.each { |column| expect(page).to have_css "a.sort_link", text: column }
    end
  end
end
