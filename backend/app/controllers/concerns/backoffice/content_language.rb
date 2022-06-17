module Backoffice
  module ContentLanguage
    extend ActiveSupport::Concern

    included do
      helper_method :content_language
    end

    private

    def content_language
      raise "@content_language_default is not set for the controller" unless defined?(@content_language_default)

      Language::TYPES.map(&:to_s).include?(params[:content_lang]&.downcase) ? params[:content_lang].downcase : @content_language_default
    end
  end
end
