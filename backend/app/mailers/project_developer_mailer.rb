class ProjectDeveloperMailer < ApplicationMailer
  def added_to_project(project_developer, project)
    @user = project_developer.owner
    @project = project

    I18n.with_locale project_developer.account_language do
      mail to: @user.email
    end
  end

  def removed_from_project(project_developer, project)
    @user = project_developer.owner
    @project = project

    I18n.with_locale project_developer.account_language do
      mail to: @user.email
    end
  end

  def project_destroyed(project_developer, project_name)
    @user = project_developer.owner
    @project_name = project_name

    I18n.with_locale project_developer.account_language do
      mail to: @user.email
    end
  end

  def open_call_destroyed(project_developer, project, open_call_name)
    @user = project_developer.owner
    @project = project
    @open_call_name = open_call_name

    I18n.with_locale project_developer.account_language do
      mail to: @user.email
    end
  end
end
