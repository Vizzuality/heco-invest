class Language
  include EnumModel

  TYPES = (I18n.available_locales - [:zu]).map(&:to_s).freeze
end
