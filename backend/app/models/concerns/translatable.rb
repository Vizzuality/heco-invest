module Translatable
  extend ActiveSupport::Concern

  included do
    attr_accessor :skip_translation

    after_save :store_changed_attributes
    after_commit :clear_changed_attributes # this will execute last
    after_commit :translate_attributes, on: [:create, :update], unless: :skip_translation
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

  def store_changed_attributes
    @stored_changed_attrs ||= []
    @stored_changed_attrs += translatable_attributes.each_with_object([]) do |attr, res|
      res << attr if previous_changes.key?("#{attr}_#{language}")
    end
  end

  def clear_changed_attributes
    @stored_changed_attrs = nil
  end

  # From the Rails docs: The after_commit and after_rollback callbacks are called for all models created, updated,
  # or destroyed within a transaction block. - in our case we have Investor / Account or PD / Account
  # However, if an exception is raised within one of these callbacks, the exception will bubble up and any remaining
  # after_commit or after_rollback methods will not be executed. As such, if your callback code could raise an exception,
  # you'll need to rescue it and handle it within the callback in order to allow other callbacks to run.
  def translate_attributes
    TranslateJob.perform_later(id, self.class.name, changed_attrs: @stored_changed_attrs) if @stored_changed_attrs.present?
  rescue Exception => e # rubocop:disable Lint/RescueException
    Google::Cloud::ErrorReporting.report e
  end
end
