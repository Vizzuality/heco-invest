class UserMailer < ApplicationMailer
  def approved(user)
    @user = user

    I18n.with_locale user.locale do
      mail to: @user.email
    end
  end

  def rejected(user)
    @user = user

    I18n.with_locale user.locale do
      mail to: @user.email
    end
  end

  def ownership_transferred(user)
    @user = user

    I18n.with_locale user.locale do
      mail to: @user.email
    end
  end

  def destroyed(email, full_name, language)
    @full_name = full_name

    I18n.with_locale(language) do
      mail to: email
    end
  end
end
