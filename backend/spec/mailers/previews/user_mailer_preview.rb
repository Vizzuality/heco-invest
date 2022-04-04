require "factory_bot"

# Preview all emails at http://localhost:4000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
  include FactoryBot::Syntax::Methods

  def send_otp_code
    UserMailer.send_otp_code build(:user, otp_secret: User.generate_otp_secret(6))
  end
end
