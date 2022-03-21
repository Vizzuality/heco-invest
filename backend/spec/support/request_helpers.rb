module RequestHelpers
  def response_json
    JSON.parse(response.body)
  end

  def get_csrf_token
    get "/api/v1/user"
    cookies[:csrf_token]
  end
end
