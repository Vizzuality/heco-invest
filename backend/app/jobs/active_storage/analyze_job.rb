# frozen_string_literal: true

# Provides asynchronous analysis of ActiveStorage::Blob records via ActiveStorage::Blob#analyze_later.
class ActiveStorage::AnalyzeJob < ActiveStorage::BaseJob
  queue_as { ActiveStorage.queues[:analysis] }

  discard_on ActiveRecord::RecordNotFound
  retry_on ActiveStorage::IntegrityError, attempts: 10, wait: :exponentially_longer

  def perform(blob)
    blob.analyze
    destroy!(blob) if blob.image? && !valid_image?(blob)
  end

  private

  def valid_image?(blob)
    blob.analyzed? && blob.metadata[:width] && blob.metadata[:height]
  end

  def destroy!(blob)
    ActiveRecord::Base.transaction do
      blob.attachments.destroy_all
      blob.destroy!
    end
  end
end
