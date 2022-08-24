class ProjectDeveloperPriorityLandscape < ApplicationRecord
  belongs_to :project_developer
  belongs_to :priority_landscape, class_name: "Location"
end
