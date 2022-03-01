module API
  module Localization
    def self.included(base)
      base.around_action :set_locale
    end

    def set_locale(&action)
      locale = if params[:locale].present? && I18n.available_locales.map(&:to_s).include?(params[:locale])
        params[:locale]
      else
        I18n.default_locale.to_s
      end
      I18n.with_locale(locale, &action)
    end
  end
end
