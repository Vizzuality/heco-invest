module Translations
  class TranslateProject
    def initialize(project)
      @project = project
    end

    def call
      translate_content = TranslateContent.new(translatable_content, source_language_code)
      (Language::TYPES - [source_language_code]).each do |target_language_code|
        column_translations = translate_content.call(target_language_code)
        present_translatable_attributes.each.with_index do |col, idx|
          I18n.with_locale(target_language_code) { @project.send(:"#{col}=", column_translations[idx]) }
        end
      end
      @project.save!
    end

    def source_language_code
      @project.language
    end

    def present_translatable_attributes
      Project.translatable_attributes.select do |col|
        # check for presence of content, since we cannot send empty strings to translation API
        @project.send(:"#{col}?", locale: source_language_code)
      end
    end

    def translatable_content
      present_translatable_attributes.map do |col|
        @project.send(col, locale: source_language_code)
      end
    end
  end
end
