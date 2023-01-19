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

      response = Klab::PollTicket.new(client).call ticket_id
      response.resolved? ? save_impact_demand_from!(response) : repeat_job
    rescue Faraday::ServerError => error
      log_failure_and_repeat_for error
    end

    private

    def save_impact_demand_from!(response)
      Array.wrap(response.artifacts_ids).each.with_index do |artifact_id, idx|
        artifact_response = Klab::ExportArtifact.new(client).call artifact_id
        artifact_code = Klab::SubmitContext::Request::INDICATORS.keys[idx]
        project.public_send "#{impact_level}_#{artifact_code}_demand=", artifact_response.summary["mean"]
      end
      project.save!
    end

    def log_failure_and_repeat_for(error)
      raise error if rest_of_attempts.zero?

      repeat_job
    end

    def repeat_job
      raise OutOfPollingAttempts if rest_of_attempts.zero?

      self.class.set(wait: delay_between_attempts.second).perform_later project.id,
        ticket_id,
        impact_level,
        rest_of_attempts: rest_of_attempts - 1
    end

    def client
      @client ||= Klab::APIClient.new
    end
  end
end
