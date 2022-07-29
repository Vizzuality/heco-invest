class DeviseMailer < Devise::Mailer
  def confirmation_instructions(record, token, opts = {})
    @token = token

    I18n.with_locale(record.locale || opts[:fallback_language]) do
      devise_mail(record, :confirmation_instructions, opts)
    end
  end

  def reset_password_instructions(record, token, opts = {})
    @token = token

    I18n.with_locale(record.locale || opts[:fallback_language]) do
      devise_mail(record, :reset_password_instructions, opts)
    end
  end

  def invitation_instructions(record, token, opts = {})
    @token = token

    I18n.with_locale(record.locale || opts[:fallback_language]) do
      devise_mail(record, :invitation_instructions, opts)
    end
  end
end
