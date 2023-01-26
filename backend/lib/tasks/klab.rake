namespace :klab do
  desc "Recalculate impacts of all projects with demands obtained from k.LAB"
  task recalculate_impacts: :environment do
    Project.all.each_with_index do |project, i|
      puts "Reset demand values of #{project.name} project"
      impact_columns = {}
      Project::IMPACT_LEVELS.each do |impact_level|
        impact_columns["#{impact_level}_demands_calculated"] = false
        (Project::IMPACT_DIMENSIONS - ["total"]).each do |impact_dimension|
          impact_columns["#{impact_level}_#{impact_dimension}_demand"] = nil
        end
      end
      project.update_columns impact_columns

      puts "Enqueueing k.LAB jobs for #{project.name} project"
      waiting_time = (10 * i).seconds # give k.LAB server some spare time so we don't overwhelm it :)
      Klab::SubmitContextsJob.set(wait: waiting_time).perform_later project.id
      Klab::CalculateImpactsJob.set(wait: waiting_time).perform_later project.id
    end
  end
end
