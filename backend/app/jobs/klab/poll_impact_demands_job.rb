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
      return skip! unless observations_exists_at? response

      Array.wrap(response.artifacts_ids).each do |artifact_id|
        artifact_response = Klab::ExportArtifact.new(client).call artifact_id
        artifact_code = Klab::SubmitContext::Request::INDICATORS.invert[artifact_response.observable]
        project.public_send "#{impact_level}_#{artifact_code}_demand=", artifact_response.demand
      end
      project.assign_attributes "#{impact_level}_demands_calculated": true
      project.save!
    end

    def skip!
      project.update! "#{impact_level}_demands_calculated": true
    end

    def observations_exists_at?(response)
      Array.wrap(response.artifacts_ids).uniq.length >= Klab::SubmitContext::Request::INDICATORS.keys.length
    end

    def log_failure_and_repeat_for(error)
      return repeat_job unless rest_of_attempts.zero?

      skip!
      raise error
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
