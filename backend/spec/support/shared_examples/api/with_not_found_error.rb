require "swagger_helper"

RSpec.shared_examples "with not found error" do |csrf: false, user: nil|
  response "404", "Not Found" do
    let("X-CSRF-TOKEN") { get_csrf_token } if csrf
    let(:id) { "not-found" }

    before do
      sign_in instance_exec(&user) if user.present?
    end

    schema "$ref" => "#/components/schemas/errors"

    run_test!
  end
end
