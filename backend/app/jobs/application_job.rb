class ApplicationJob < ActiveJob::Base
  discard_on ActiveJob::DeserializationError

  before_enqueue { |job| upsert_event job, status: :enqueued }
  before_perform { |job| upsert_event job, status: :processing }
  after_perform { |job| upsert_event job, status: :completed }

  around_perform :store_exception_at_event

  private

  def store_exception_at_event
    yield
  rescue Exception => e # rubocop:disable Lint/RescueException
    upsert_event self, status: :crashed, message: e.backtrace
    Google::Cloud::ErrorReporting.report e
    raise e
  end

  def upsert_event(job, **attr)
    BackgroundJobEvent.find_or_initialize_by(id: job.job_id).tap do |event|
      event.assign_attributes(
        attr.merge(arguments: job.arguments, queue_name: job.queue_name, priority: job.priority, executions: job.executions)
      )
      event.save!
    end
  end
end
