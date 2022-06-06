require "swagger_helper"

RSpec.shared_examples "with forbidden error" do |csrf: false, user: nil|
  response "403", "Forbidden" do
    let("X-CSRF-TOKEN") { get_csrf_token } if csrf

    before do
      sign_in instance_exec(&user) if user.present?
    end

    schema "$ref" => "#/components/schemas/errors"

    run_test!
  end
end
