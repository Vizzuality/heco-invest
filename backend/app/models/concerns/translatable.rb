module Translatable
  extend ActiveSupport::Concern

  included do
    attr_accessor :skip_translation

    after_save :translate_attributes, unless: :skip_translation
  end

  class_methods do
    def translates(*attributes)
      super(*attributes)

      attributes.each do |attribute|
        define_method(attribute) do |**kwargs|
          super(**kwargs.merge(fallback: [language]))
        end
      end
    end
  end

  def translate_attributes
    changed_attrs = translatable_attributes.each_with_object([]) do |attr, res|
      res << attr if public_send "saved_change_to_#{attr}_#{language}?"
    end

    TranslateJob.perform_later self, changed_attrs: changed_attrs if changed_attrs.present?
  end
end
