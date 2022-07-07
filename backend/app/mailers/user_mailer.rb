class UserMailer < ApplicationMailer
  def approved(user)
    @user = user

    mail to: @user.email
  end

  def rejected(user)
    @user = user

    mail to: @user.email
  end

  def destroyed(email, full_name)
    @full_name = full_name

    mail to: email
  end
end
