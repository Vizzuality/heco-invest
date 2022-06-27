module Backoffice
  module Localization
    def self.included(base)
      base.around_action :set_locale
    end

    def set_locale(&action)
      locale = session[:locale].presence || current_admin&.ui_language
      locale = I18n.default_locale.to_s unless Language::TYPES.include?(locale)
      I18n.with_locale(locale, &action)
    end
  end
end
