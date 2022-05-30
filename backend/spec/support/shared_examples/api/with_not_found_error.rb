require "swagger_helper"

RSpec.shared_examples "with not found error" do |csrf: false, require_project_developer: false|
  response "404", "Not Found" do
    let("X-CSRF-TOKEN") { get_csrf_token } if csrf
    let(:id) { "not-found" }

    before do
      sign_in create(:user_project_developer) if require_project_developer
    end

    schema "$ref" => "#/components/schemas/errors"

    run_test!
  end
end
