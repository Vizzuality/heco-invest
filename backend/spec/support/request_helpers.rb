module RequestHelpers
  def response_json
    JSON.parse(response.body)
  end

  def get_csrf_token
    headers = {"ACCEPT" => "application/json"}
    get "/api/v1/user", headers: headers
    cookies["csrf_token"]
  end

  def with_environment(replacement_env)
    original_env = ENV.to_hash
    ENV.update(replacement_env)

    yield
  ensure
    ENV.replace(original_env)
  end
end
