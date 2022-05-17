module API
  module V1
    class TestJobsController < BaseController
      skip_forgery_protection

      def test_sync
        TestJob.perform_now(params[:email])
        head :ok
      end

      def test_async
        TestJob.perform_later(params[:email])
        head :ok
      end
    end
  end
end
