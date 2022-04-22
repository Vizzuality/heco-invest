require "swagger_helper"

RSpec.describe "Direct Upload", type: :request do
  path "/rails/active_storage/direct_uploads" do
    post "Create blob record - obtain data for direct upload to storage" do
      tags "Direct Upload"
      security [csrf: []]
      produces "application/json"
      consumes "application/json"
      parameter name: :direct_upload_params, in: :body, schema: {
        type: :object,
        properties: {
          blob: {
            type: :object,
            properties: {
              byte_size: {type: :integer},
              checksum: {type: :string},
              content_type: {type: :string},
              filename: {type: :string}
            }
          }
        },
        required: %w[byte_size checksum content_type filename]
      }

      let(:user) { create :user }
      let(:direct_upload_params) do
        {
          blob: {
            byte_size: 32_326,
            checksum: "QYeLAwqIj9HrwITqtTYaEw==",
            content_type: "image/jpeg",
            filename: "test.jpg"
          }
        }
      end

      it_behaves_like "with not authorized error", csrf: true

      response "200", :success do
        schema "$ref" => "#/components/schemas/direct_upload"

        let("X-CSRF-TOKEN") { get_csrf_token }

        before { sign_in user }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body)
            .to match_snapshot("api/v1/get-direct-upload", dynamic_attributes: %w[key signed_id attachable_sgid url])
        end
      end
    end
  end
end
