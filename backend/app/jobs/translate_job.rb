class TranslateJob < ApplicationJob
  queue_as ENV["CLOUD_TASKS_TEST_QUEUE_NAME"].to_sym
  discard_on ActiveRecord::RecordNotFound

  def perform(resource_id, resource_class, changed_attrs: nil)
    resource = resource_class.constantize.find(resource_id)
    Translations::Translate.new(resource, changed_attrs: changed_attrs).call
  end
end
