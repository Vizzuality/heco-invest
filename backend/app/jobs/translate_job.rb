class TranslateJob < ApplicationJob
  queue_as ENV["CLOUD_TASKS_TEST_QUEUE_NAME"].to_sym

  rescue_from(ActiveRecord::RecordNotFound) do |exception|
    Rails.logger.error(exception)
    Rails.logger.error(Rails.backtrace_cleaner.clean(exception.backtrace).join("\n"))
    Google::Cloud::ErrorReporting.report exception
  end

  def perform(resource)
    Translations::Translate.new(resource).call
  end
end
