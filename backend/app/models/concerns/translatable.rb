module Translatable
  extend ActiveSupport::Concern

  included do
    attr_accessor :skip_translation

    after_save :translate_attributes, unless: :skip_translation
  end

  def translate_attributes
    return unless translatable_attributes.any? { |attr| public_send "saved_change_to_#{attr}_#{language}?" }

    TranslateJob.perform_later self
  end
end
