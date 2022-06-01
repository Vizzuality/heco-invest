class TranslateJob < ApplicationJob
  queue_as ENV["CLOUD_TASKS_TEST_QUEUE_NAME"].to_sym

  def perform(resource)
    Translations::Translate.new(resource).call
  end
end
