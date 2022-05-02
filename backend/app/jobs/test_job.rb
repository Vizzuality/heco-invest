class TestJob < ApplicationJob
  queue_as :default

  def perform(email)
    logger.debug("Background processing test #{email}")
    TestJobMailer.with(email: email).test_email.deliver_now
  end
end
