module Klab
  class APIClient
    attr_reader :token

    def initialize
      username = ENV.fetch("KLAB_API_USERNAME")
      password = ENV.fetch("KLAB_API_PASSWORD")

      @connection = Klab::APIConnection.new

      response = @connection.post do |req|
        req.url url
        req.headers["Content-Type"] = "application/json"
        req.body = {username: username, password: password}.to_json
      end
      response_json = JSON.parse(response.body)
      @token = response_json["session"]
    end

    def url
      "/modeler/api/v2/users/log-in"
    end
  end
end
