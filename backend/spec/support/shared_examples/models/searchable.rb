RSpec.shared_examples :searchable do
  attribute = "#{described_class.translatable_attributes.first}_en"
  factory = described_class.table_name.singularize

  describe ".dynamic_search" do
    let!(:searched_record_correct) { create factory, attribute => "CORRECT" }
    let!(:searched_record_wrong) { create factory, attribute => "WRONG" }

    it "finds correct records" do
      expect(described_class.dynamic_search([attribute], "CORRECT")).to eq([searched_record_correct])
    end
  end
end
