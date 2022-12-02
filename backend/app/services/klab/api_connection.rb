module Klab
  class APIConnection < Faraday::Connection
    def initialize
      super(ENV.fetch("KLAB_API_HOST")) do |conn|
        conn.request :retry, retry_options
        conn.response :raise_error
      end
      options.timeout = 120
      options.open_timeout = 120
    end

    private

    def retry_options
      {
        max: 5,
        interval: 10,
        interval_randomness: 0.5, # add to next retry interval
        backoff_factor: 2, # multiply next retry interval by this
        exceptions: [
          Errno::ETIMEDOUT,
          Timeout::Error,
          Faraday::TimeoutError,
          Faraday::ConnectionFailed,
          Faraday::ConflictError
        ]
      }
    end
  end
end
