class ApplicationMailer < ActionMailer::Base
  default from: ENV.fetch("MAILER_DEFAULT_FROM", "please-change-me@example.com")
  layout "mailer"
end
