module Translations
  class TranslateContent
    def initialize(translatable_content, source_language_code)
      @translatable_content = translatable_content
      @source_language_code = source_language_code
    end

    def client
      @client = Google::Cloud::Translate.translation_service
    end

    def call(target_language_code)
      response = client.translate_text contents: @translatable_content,
        source_language_code: @source_language_code,
        target_language_code: target_language_code,
        parent: "projects/#{ENV["GCP_PROJECT_ID"]}/locations/global",
        mime_type: "text/plain"
      response.translations.map(&:translated_text)
    rescue Google::Cloud::Error => exception
      # Handle exceptions that subclass Google::Cloud::Error
      Rails.logger.error(exception)
      Rails.logger.error(Rails.backtrace_cleaner.clean(exception.backtrace).join("\n"))
      # TODO: handle exception tracking
    end
  end
end
