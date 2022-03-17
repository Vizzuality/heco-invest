require "swagger_helper"

RSpec.shared_examples "with not found error" do
  response "404", "Not Found" do
    let(:id) { "not-found" }

    schema "$ref" => "#/components/schemas/errors"

    run_test!
  end
end
