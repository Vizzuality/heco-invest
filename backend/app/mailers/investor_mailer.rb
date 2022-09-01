class InvestorMailer < ApplicationMailer
  def project_destroyed(investor, project_name)
    @user = investor.owner
    @project_name = project_name

    I18n.with_locale investor.account_language do
      mail to: @user.email
    end
  end

  def open_call_destroyed(investor, open_call_name)
    @user = investor.owner
    @open_call_name = open_call_name

    I18n.with_locale investor.account_language do
      mail to: @user.email
    end
  end

  def open_call_application_destroyed(investor, project)
    @user = investor.owner
    @project = project

    I18n.with_locale investor.account_language do
      mail to: @user.email
    end
  end
end
