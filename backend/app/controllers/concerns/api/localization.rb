module API
  module Localization
    def self.included(base)
      base.around_action { |_controller, action| set_locale(&action) }
    end

    def set_locale(language: nil, fallback_language: nil, &action)
      locale = if language.present? && Language::TYPES.include?(language)
        language
      elsif params[:locale].present? && Language::TYPES.include?(params[:locale])
        params[:locale]
      elsif fallback_language.present? && Language::TYPES.include?(fallback_language)
        fallback_language
      else
        I18n.default_locale.to_s
      end
      I18n.with_locale(locale, &action)
    end
  end
end
