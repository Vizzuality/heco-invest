require "google/cloud/error_reporting"

module API
  module V1
    class GoesController < BaseController
      skip_forgery_protection

      def boom
        TestErrorJob.perform_later(params[:message])
        head :ok
      end
    end
  end
end
