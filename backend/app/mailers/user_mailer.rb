class UserMailer < ApplicationMailer
  def approved(user)
    @user = user

    mail to: @user.email
  end

  def rejected(user)
    @user = user

    mail to: @user.email
  end
end
