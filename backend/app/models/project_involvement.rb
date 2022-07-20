class ProjectInvolvement < ApplicationRecord
  belongs_to :project
  belongs_to :project_developer

  validates_uniqueness_of :project_id, scope: :project_developer_id

  after_create do
    if project.valid? && project.published? && !project.status_changed? # notification is send only when project status has not changed to published, in such case project itself notifies all users on its own
      ProjectDeveloperMailer.added_to_project(project_developer, project).deliver_later
    end
  end

  after_destroy do
    if project.valid? && project.published? && destroyed_by_association.blank? # notification is send only when record is not destroyed by parent association, in such case parent takes care of notification
      ProjectDeveloperMailer.removed_from_project(project_developer, project).deliver_later
    end
  end
end
