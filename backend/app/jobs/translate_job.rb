class TranslateJob < ApplicationJob
  queue_as ENV["CLOUD_TASKS_TEST_QUEUE_NAME"].to_sym

  def perform(resource, changed_attrs: nil)
    Translations::Translate.new(resource, changed_attrs: changed_attrs).call
  end
end
