class TranslateJob < ApplicationJob
  queue_as :default

  rescue_from(ActiveRecord::RecordNotFound) do |exception|
    Rails.logger.error(exception)
    Rails.logger.error(Rails.backtrace_cleaner.clean(exception.backtrace).join("\n"))
    # TODO: handle exception tracking
  end

  def perform(resource)
    Translations::Translate.new(resource).call
  end
end
