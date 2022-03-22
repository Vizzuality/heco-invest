module RequestHelpers
  def response_json
    JSON.parse(response.body)
  end

  def get_csrf_token
    headers = {"ACCEPT" => "application/json"}
    get "/api/v1/csrf", headers: headers
    response_json["token"]
  end
end
