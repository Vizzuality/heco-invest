module Translations
  class TranslateProjectJob < ApplicationJob
    queue_as :default

    rescue_from(ActiveRecord::RecordNotFound) do |exception|
      Rails.logger.error(exception)
      Rails.logger.error(Rails.backtrace_cleaner.clean(exception.backtrace).join("\n"))
      # TODO: handle exception tracking
    end

    def perform(project_id)
      project = Project.find(project_id)
      Translations::TranslateProject.new(project).call
    end
  end
end
