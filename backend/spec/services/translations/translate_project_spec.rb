require "rails_helper"

RSpec.describe Translations::TranslateProject do
  let(:project) {
    translatable_columns = Translations::TranslateProject.translatable_columns
    attrs = translatable_columns.map { |col| ["#{col}_en", "test"] }.to_h
    create(:project, attrs.merge(name_en: "Project name")) # for simplicity just one translatable attribute present
  }
  subject { described_class.new project }

  describe "#call" do
    before do
      spanish_translations = Translations::TranslateProject.translatable_columns.map { "test" }
      spanish_translations[0] = "Nombre del proyecto"
      allow(@translate_content_double).to receive(:call).with(any_args).and_return(spanish_translations)
      subject.call
    end

    it "saves Spanish translations" do
      expect(project.reload.name_es).to eq("Nombre del proyecto")
    end
  end
end
