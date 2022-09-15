module Jobs
  class OpenCallsController < BaseController
    def close_past_deadline
      OpenCall.where(status: %i[draft launched], closing_at: ..Time.current).update! status: :closed
    end
  end
end
