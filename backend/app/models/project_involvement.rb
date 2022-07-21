class ProjectInvolvement < ApplicationRecord
  belongs_to :project
  belongs_to :project_developer

  validates_uniqueness_of :project_id, scope: :project_developer_id

  after_create_commit do
    ProjectDeveloperMailer.added_to_project(project_developer, project).deliver_later if notify_project_developer?
  end

  after_destroy_commit do
    if notify_project_developer? && destroyed_by_association.blank? # notification is send only when record is not destroyed by parent association, in such case parent takes care of notification
      ProjectDeveloperMailer.removed_from_project(project_developer, project).deliver_later
    end
  end

  private

  def notify_project_developer?
    project.published? && !project.saved_change_to_status? # notification is send only when project is published and it does not changed its status just now -- in such case project itself notifies all users
  end
end
