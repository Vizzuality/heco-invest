# frozen_string_literal: true

class UserMailer < ApplicationMailer
  def send_otp_code(user)
    @user = user
    mail to: @user.email, subject: I18n.t("mailers.user.send_otp_code.subject")
  end
end
