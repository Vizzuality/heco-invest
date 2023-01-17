module Klab
  class OutOfPollingAttempts < StandardError; end

  class PollImpactDemandsJob < ApplicationJob
    queue_as ENV["CLOUD_TASKS_TEST_QUEUE_NAME"].to_sym

    attr_accessor :project, :ticket_id, :impact_level, :rest_of_attempts, :delay_between_attempts

    def perform(project_id, ticket_id, impact_level, rest_of_attempts: 250, delay_between_attempts: 10)
      @project = Project.find project_id
      @ticket_id = ticket_id
      @impact_level = impact_level
      @rest_of_attempts = rest_of_attempts
      @delay_between_attempts = delay_between_attempts

      response = poll_ticket!
      save_impact_demand_from! response
    rescue Faraday::ServerError, OutOfPollingAttempts => error
      log_failure_and_repeat_for error
    end

    private

    def poll_ticket!
      # TODO
    end

    def save_impact_demand_from!(response)
      # TODO
    end

    def log_failure_and_repeat_for(error)
      if rest_of_attempts.zero?
        Google::Cloud::ErrorReporting.report error
        raise error
      else
        repeat_job
      end
    end

    def repeat_job
      self.class.set(wait: delay_between_attempts.second).perform_later project.id,
        ticket_id,
        impact_level,
        rest_of_attempts: rest_of_attempts - 1
    end
  end
end
