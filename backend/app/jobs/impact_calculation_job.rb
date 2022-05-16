class ImpactCalculationJob < ApplicationJob
  def perform(project)
    Impacts::CalculateForProject.new(project).call
  end
end
