module Klab
  class SubmitContext
    class Request
      INDICATORS = {
        biodiversity: "im:Indicator (value of ecology:Biodiversity)",
        climate: "im:Indicator (value of ecology:Ecosystem for es:ClimateRegulation)",
        community: "im:Indicator (es.nca:Condition of demography:Human demography:Community)",
        water: "im:Indicator (es.nca:Condition of earth:Aquatic ecology:Ecosystem)"
      }.freeze

      def initialize(token)
        @connection = APIConnection.new
        @token = token
      end

      def call(geometry)
        @connection.post do |req|
          req.url url
          req.headers["Authorization"] = @token
          req.headers["Content-Type"] = "application/json"
          req.body = {
            urn: geometry,
            observables: INDICATORS.values,
            scenarios: [],
            estimate: false,
            estimatedCost: -1
          }.to_json
        end
      end

      def url
        "/modeler/api/v2/public/submit/context"
      end
    end

    class Response
      attr_reader :ticket_id

      def initialize(response)
        body = JSON.parse(response.body)
        @ticket_id = body["id"]
      end
    end

    attr_reader :ticket_id

    def initialize(client)
      @token = client.token
    end

    def call(geometry)
      Rails.logger.debug "Requesting context with observables"
      request = Request.new(@token)
      response = Response.new(request.call(geometry))
      @ticket_id = response.ticket_id
      response
    end
  end
end
