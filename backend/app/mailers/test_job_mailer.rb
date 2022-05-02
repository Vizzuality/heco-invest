class TestJobMailer < ApplicationMailer
  def test_email
    mail(to: params[:email], subject: "Hello from test job", content_type: "text/html", body: "EOT")
  end
end
