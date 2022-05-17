class TestJob < ApplicationJob
  queue_as ENV["CLOUD_TASKS_TEST_QUEUE_NAME"].to_sym

  def perform(email)
    logger.debug("Background processing test #{email}")
    TestJobMailer.with(email: email).test_email.deliver_now
  end
end
