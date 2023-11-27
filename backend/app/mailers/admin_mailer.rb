class AdminMailer < ApplicationMailer
  def first_time_login_instructions(admin)
    @admin = admin
    @token = set_reset_password_token admin

    I18n.with_locale admin.locale do
      mail to: admin.email
    end
  end

  def project_developer_created(admin, project_developer)
    @admin = admin
    @project_developer = project_developer

    I18n.with_locale admin.locale do
      mail to: admin.email
    end
  end

  def investor_created(admin, investor)
    @admin = admin
    @investor = investor

    I18n.with_locale admin.locale do
      mail to: admin.email
    end
  end

  private

  def set_reset_password_token(admin)
    raw, enc = Devise.token_generator.generate(Admin, :reset_password_token)

    admin.reset_password_token = enc
    admin.reset_password_sent_at = Time.current
    admin.save validate: false
    raw
  end
end
