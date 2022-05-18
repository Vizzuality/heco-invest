require "google/cloud/error_reporting"

module API
  module V1
    class GoesController < BaseController
      skip_forgery_protection

      def boom
        fail "API goes BOOOMMM!"
      rescue => exception
        Google::Cloud::ErrorReporting.report exception
      end
    end
  end
end
