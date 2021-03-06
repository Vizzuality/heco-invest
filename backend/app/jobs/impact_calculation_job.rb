class ImpactCalculationJob < ApplicationJob
  queue_as ENV["CLOUD_TASKS_TEST_QUEUE_NAME"].to_sym

  def perform(project)
    Impacts::CalculateForProject.new(project).call
  end
end
