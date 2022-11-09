class TestErrorJob < ApplicationJob
  queue_as ENV["CLOUD_TASKS_TEST_QUEUE_NAME"].to_sym

  def perform(message)
    logger.error("Queued job logs error BOOOMMM with message #{message}!")
    logger.info("Queued job logs info BOOOMMM with message #{message}!")
    logger.debug("Queued job logs debug BOOOMMM with message #{message}!")
    raise "Queued job goes BOOOMMM with message #{message}!"
  end
end
