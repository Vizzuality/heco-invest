module Klab
  class SubmitContextsJob < ApplicationJob
    queue_as ENV["CLOUD_TASKS_TEST_QUEUE_NAME"].to_sym

    attr_accessor :project, :rest_of_attempts, :delay_between_attempts

    def perform(project_id, rest_of_attempts: 5, delay_between_attempts: 30)
      @project = Project.find project_id
      @rest_of_attempts = rest_of_attempts
      @delay_between_attempts = delay_between_attempts

      tickets = submit_contexts!
      enqueue_poll_demands_jobs_for tickets
    rescue Faraday::ServerError => error
      log_failure_and_repeat_for error
    end

    private

    def submit_contexts!
      # TODO
    end

    def enqueue_poll_demands_jobs_for(tickets)
      tickets.each do |ticket|
        Klab::PollImpactDemandsJob.perform_later project.id, ticket[:impact_level], ticket[:id]
      end
    end

    def log_failure_and_repeat_for(error)
      if rest_of_attempts.zero?
        Google::Cloud::ErrorReporting.report error
        raise error
      else
        self.class.set(wait: delay_between_attempts.second).perform_later project.id, rest_of_attempts: rest_of_attempts - 1
      end
    end
  end
end
