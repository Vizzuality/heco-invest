module API
  module Localization
    def self.included(base)
      base.around_action { |_controller, action| set_locale(nil, &action) }
    end

    def set_locale(language = nil, &action)
      locale = if params[:locale].present? && Language::TYPES.include?(params[:locale])
        params[:locale]
      elsif language.present? && Language::TYPES.include?(language)
        language
      else
        I18n.default_locale.to_s
      end
      I18n.with_locale(locale, &action)
    end
  end
end
