class BackgroundJobEvent < ApplicationRecord
  enum status: {enqueued: 0, processing: 1, completed: 2, crashed: 3}, _default: :enqueued

  validates_presence_of :executions
end
