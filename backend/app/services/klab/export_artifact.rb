module Klab
  class ExportArtifact
    class Request
      def initialize(token, artifact_id)
        @token = token
        @artifact_id = artifact_id
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
        "/modeler/api/v2/public/export/structure/#{@artifact_id}"
      end
    end

    class Response
      attr_reader :observable, :summary

      def initialize(response)
        body = JSON.parse(response.body)
        @observable = body["observable"]
        @summary = body["dataSummary"]
      end
    end

    def initialize(client)
      @token = client.token
    end

    def call(artifact_id)
      request = Request.new(@token, artifact_id)
      Response.new(request.call)
    end
  end
end
