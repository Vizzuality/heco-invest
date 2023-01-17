module Klab
  class CalculateImpactsJob < ApplicationJob
    queue_as ENV["CLOUD_TASKS_TEST_QUEUE_NAME"].to_sym

    def perform(project_id, rest_of_attempts: 250, delay_between_attempts: 30)
      @project = Project.find project_id
      @rest_of_attempts = rest_of_attempts
      @delay_between_attempts = delay_between_attempts
      return repeat_job unless all_demands_available?

      # Impacts::CalculateForProject.new(project).call # modify this service somehow so it supports taking demands from project
    end

    private

    def all_demands_available?
      Project::IMPACT_LEVELS.each do |impact_level|
        Project::IMPACT_DIMENSIONS.each do |impact_dimension|
          return false if project.public_send("#{impact_level}_#{impact_dimension}_demand").blank?
        end
      end
      true
    end

    def repeat_job
      self.class.set(wait: delay_between_attempts.second).perform_later project.id, rest_of_attempts: rest_of_attempts - 1
    end
  end
end
