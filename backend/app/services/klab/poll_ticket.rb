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

    def call(ticket_id, async: true)
      request = Request.new(@token, ticket_id)
      response = Response.new(request.call)
      response = wait_till_ticket_gets_resolved response, request unless async
      @artifacts_ids = response.artifacts_ids
      response
    end

    def wait_till_ticket_gets_resolved(response, request, count = 1)
      Rails.logger.debug "Checking if context response resolved (#{count})"
      Rails.logger.debug response
      return response if response.resolved?

      response = Response.new request.call
      sleep self.class.sleep_interval
      wait_till_ticket_gets_resolved response, request, count + 1
    end

    # number of seconds to wait between calls
    def self.sleep_interval
      5
    end
  end
end
