class ProjectInvolvement < ApplicationRecord
  belongs_to :project
  belongs_to :project_developer

  validates_uniqueness_of :project_id, scope: :project_developer_id

  after_create do
    ProjectDeveloperMailer.added_to_project(project_developer, project).deliver_later
  end

  after_destroy do
    ProjectDeveloperMailer.removed_from_project(project_developer, project).deliver_later
  end
end
