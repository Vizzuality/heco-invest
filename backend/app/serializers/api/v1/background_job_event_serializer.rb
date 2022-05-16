module API
  module V1
    class BackgroundJobEventSerializer < BaseSerializer
      attributes :status, :arguments, :queue_name, :priority, :executions, :message, :created_at, :updated_at
    end
  end
end
