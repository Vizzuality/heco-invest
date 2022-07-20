class AdminMailer < ApplicationMailer
  def first_time_login_instructions(admin)
    @admin = admin
    @token = set_reset_password_token admin

    I18n.with_locale admin.ui_language do
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
