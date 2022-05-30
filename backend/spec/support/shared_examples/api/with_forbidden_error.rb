require "swagger_helper"

RSpec.shared_examples "with forbidden error" do |csrf: false, require_project_developer: false|
  response "403", "Forbidden" do
    let("X-CSRF-TOKEN") { get_csrf_token } if csrf

    before do
      if require_project_developer
        sign_in create(:user_project_developer)
      else
        sign_in create(:user)
      end
    end

    schema "$ref" => "#/components/schemas/errors"

    run_test!
  end
end
