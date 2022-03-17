require "swagger_helper"

RSpec.describe "API V1 Enums", type: :request do
  path "/api/v1/enums" do
    get "Returns list of the enums" do
      tags "Enums"
      produces "application/json"

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/enum"}}
        }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/enums")
        end
      end
    end
  end
end
