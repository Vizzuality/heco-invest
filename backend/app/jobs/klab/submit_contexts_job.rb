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
      Project::IMPACT_LEVELS.each_with_object([]) do |impact_level, result|
        context_string = Klab::BuildContextString.new(project, impact_level).call
        next skip! impact_level if context_string.blank?

        response = Klab::SubmitContext.new(client).call context_string
        result << {id: response.ticket_id, impact_level: impact_level}
      end
    end

    def enqueue_poll_demands_jobs_for(tickets)
      tickets.each do |ticket|
        Klab::PollImpactDemandsJob.perform_later project.id, ticket[:id], ticket[:impact_level]
      end
    end

    def skip!(impact_level)
      project.update! "#{impact_level}_demands_calculated": true
    end

    def log_failure_and_repeat_for(error)
      raise error if rest_of_attempts.zero?

      self.class.set(wait: delay_between_attempts.second).perform_later project.id, rest_of_attempts: rest_of_attempts - 1
    end

    def client
      @client ||= Klab::APIClient.new
    end
  end
end
