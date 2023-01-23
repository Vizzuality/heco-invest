class ImpactCalculationJob < ApplicationJob
  queue_as ENV["CLOUD_TASKS_TEST_QUEUE_NAME"].to_sym

  def perform(project_id)
    project = Project.find project_id
    Impacts::CalculateForProject.new(project, demands_source: Location).call
  end
end
