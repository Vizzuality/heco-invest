module Klab
  class PollTicket
    class Request
      def initialize(token, ticket_id)
        @token = token
        @ticket_id = ticket_id
      end

      def call
        @connection = APIConnection.new

        @connection.get do |req|
          req.url url
          req.headers["Authorization"] = @token
          req.headers["Content-Type"] = "application/json"
          req.headers["Accept"] = "application/json"
          req.headers["User-Agent"] = "User-Agent: k.LAB/0.11.0 (client:klab-api)"
        end
      end

      def url
        "/modeler/api/v2/public/ticket/info/#{@ticket_id}"
      end
    end

    class Response
      attr_reader :status, :data

      def initialize(response)
        body = JSON.parse(response.body)
        @status = body["status"]
        @data = body["data"]
      end

      def resolved?
        @status == "RESOLVED"
      end

      def artifacts_ids
        return nil unless resolved?

        @data["artifacts"].split(",")
      end
    end

    attr_reader :artifacts_ids

    def initialize(client)
      @token = client.token
    end

    def call(ticket_id)
      request = Request.new(@token, ticket_id)
      response = Response.new(request.call)
      cnt = 1
      Rails.logger.debug "Checking if context response resolved (#{cnt})"
      Rails.logger.debug response
      # this part can take a few minutes - ticket gets resolved when observations for all indicators completed
      until response.resolved?
        cnt += 1
        Rails.logger.debug "Checking if context response resolved (#{cnt})"
        Rails.logger.debug response
        response = Response.new(request.call)
        sleep(self.class.sleep_interval)
      end
      @artifacts_ids = response.artifacts_ids
      response
    rescue Faraday::ServerError => e
      Google::Cloud::ErrorReporting.report e
      raise e
    end

    # number of seconds to wait between calls
    def self.sleep_interval
      5
    end
  end
end
