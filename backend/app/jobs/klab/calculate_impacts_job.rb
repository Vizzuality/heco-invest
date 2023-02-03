module Klab
  class DemandsNotAvailable < StandardError; end

  class CalculateImpactsJob < ApplicationJob
    queue_as ENV["CLOUD_TASKS_TEST_QUEUE_NAME"].to_sym

    attr_accessor :project, :rest_of_attempts, :delay_between_attempts

    def perform(project_id, rest_of_attempts: 250, delay_between_attempts: 30)
      @project = Project.find project_id
      @rest_of_attempts = rest_of_attempts
      @delay_between_attempts = delay_between_attempts
      return repeat_job unless all_demands_available?

      Impacts::CalculateForProject.new(project, demands_source: Project).call
    end

    private

    def all_demands_available?
      Project::IMPACT_LEVELS.all? { |impact_level| project.public_send("#{impact_level}_demands_calculated") }
    end

    def repeat_job
      raise DemandsNotAvailable if rest_of_attempts.zero?

      self.class.set(wait: delay_between_attempts.second).perform_later project.id, rest_of_attempts: rest_of_attempts - 1
    end
  end
end
