class ProjectDeveloperLocation < ApplicationRecord
  belongs_to :location
  belongs_to :project_developer
end
