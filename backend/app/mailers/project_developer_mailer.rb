class ProjectDeveloperMailer < ApplicationMailer
  def added_to_project(project_developer, project)
    @user = project_developer.owner
    @project = project

    mail to: @user.email
  end

  def removed_from_project(project_developer, project)
    @user = project_developer.owner
    @project = project

    mail to: @user.email
  end
end
