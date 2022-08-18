RSpec.shared_examples :with_ransacked_translations do
  attribute = described_class.translatable_attributes.first
  factory = described_class.table_name.singularize

  describe "ransackers for translated attributes" do
    let!(:resource) { create factory }

    before do
      resource.public_send "#{attribute}_en=", "EN TEXT"
      resource.public_send "#{attribute}_es=", "ES TEXT"
      resource.public_send "#{attribute}_pt=", nil
      resource.save!
    end

    it "allows to use ransack" do
      expect(described_class.ransack("#{attribute}_cont" => "EN TEXT").result.pluck(:id)).to eq([resource.id])
      expect(described_class.ransack("#{attribute}_cont" => "WRONG TEXT").result.pluck(:id)).to be_empty
    end

    it "ransack fallbacks to default language" do
      I18n.with_locale :es do
        expect(described_class.ransack("#{attribute}_cont" => "EN TEXT").result.pluck(:id)).to be_empty
      end
      I18n.with_locale :pt do
        expect(described_class.ransack("#{attribute}_cont" => "EN TEXT").result.pluck(:id)).to eq([resource.id])
      end
    end
  end
end

RSpec.shared_examples :with_ransacked_static_types do |*static_types|
  factory = described_class.table_name.singularize

  static_types.each do |static_type|
    describe "ransackers for #{static_type}" do
      let!(:resource) { create factory }
      let(:klass) { static_type.to_s.classify.constantize }
      let(:obj) { klass.all.first }

      before do
        value = described_class.columns_hash[static_type.to_s].array ? [obj.slug] : obj.slug
        resource.update! static_type => value
      end

      it "allows to use ransack with localized static type text" do
        expect(described_class.ransack("#{static_type}_localized_cont" => obj.name).result.pluck(:id)).to eq([resource.id])
        expect(described_class.ransack("#{static_type}_localized_cont" => "WRONG TEXT").result.pluck(:id)).to be_empty
      end
    end
  end
end

RSpec.shared_examples :with_ransacked_enums do |**enums|
  factory = described_class.table_name.singularize

  enums.each do |enum, klass|
    describe "ransackers for #{enum}" do
      let!(:resource) { create factory }
      let(:obj) { klass.all.first }

      before do
        resource.update! enum => obj.slug
      end

      it "allows to use ransack with localized enum text" do
        expect(described_class.ransack("#{enum}_localized_cont" => obj.name).result.pluck(:id)).to eq([resource.id])
        expect(described_class.ransack("#{enum}_localized_cont" => "WRONG TEXT").result.pluck(:id)).to be_empty
      end
    end
  end
end
