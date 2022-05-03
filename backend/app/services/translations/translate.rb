module Translations
  class Translate
    attr_accessor :resource

    def initialize(resource)
      @resource = resource
    end

    def call
      assign_translation_for Language::TYPES - [source_language_code]
      resource.save!
    end

    private

    def assign_translation_for(languages)
      languages.each do |target_language_code|
        column_translations = translate_content_for target_language_code
        present_translatable_attributes.each.with_index do |col, idx|
          I18n.with_locale(target_language_code) { resource.public_send(:"#{col}=", column_translations[idx]) }
        end
      end
    end

    def translate_content_for(language)
      response = client.translate_text contents: translatable_content,
        source_language_code: source_language_code,
        target_language_code: language,
        parent: "#{resource.table_name}/#{ENV["GCP_PROJECT_ID"]}/locations/global",
        mime_type: "text/plain"
      response.translations.map(&:translated_text)
    rescue Google::Cloud::Error => exception
      handle_exception exception
    end

    def handle_exception(error)
      Rails.logger.error(error)
      Rails.logger.error(Rails.backtrace_cleaner.clean(error.backtrace).join("\n"))
      # TODO: handle exception tracking
    end

    def present_translatable_attributes
      @present_translatable_attributes ||= resource.translatable_attributes.select do |col|
        resource.public_send(:"#{col}?", locale: source_language_code)
      end
    end

    def translatable_content
      @translatable_content ||= present_translatable_attributes.map do |col|
        resource.public_send(col, locale: source_language_code)
      end
    end

    def source_language_code
      @source_language_code ||= resource.language
    end

    def client
      @client ||= Google::Cloud::Translate.translation_service
    end
  end
end
