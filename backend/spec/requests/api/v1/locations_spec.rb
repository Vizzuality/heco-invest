require "swagger_helper"

RSpec.describe "API V1 Locations", type: :request do
  before_all do
    @country = create :location, :with_municipalities, municipalities_count: 3
  end

  path "/api/v1/locations" do
    get "Returns list of the locations" do
      tags "Locations"
      produces "application/json"
      parameter name: "filter[location_type]", in: :query, type: :string, enum: LocationType::TYPES, description: "Filter locations based on location type", required: false
      parameter name: "filter[parent_id]", in: :query, type: :string, description: "Filter locations based on its closest parent", required: false
      parameter name: "fields[location]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :includes, in: :query, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/location"}}
        }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/locations")
        end

        context "with sparse fieldset" do
          let("fields[location]") { "name,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/locations-sparse-fieldset")
          end
        end

        context "with relationships" do
          let("fields[location]") { "name,parent" }
          let(:includes) { "parent" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/locations-include-relationships")
          end
        end

        context "when filter by location type is used" do
          let("filter[location_type]") { "country" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/locations-filter-by-location-type")
          end
        end

        context "when filter by parent id is used" do
          let("filter[parent_id]") { @country.id }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/locations-filter-by-parent-id")
          end
        end
      end
    end
  end

  path "/api/v1/locations/{id}" do
    get "Find location by id" do
      tags "Locations"
      produces "application/json"
      parameter name: :id, in: :path, type: :string, description: "Use location ID"
      parameter name: "fields[location]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :includes, in: :query, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false

      let(:id) { Location.find_by(location_type: "municipality").id }

      it_behaves_like "with not found error"

      response "200", :success do
        schema type: :object, properties: {
          data: {"$ref" => "#/components/schemas/location"}
        }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/get-location")
        end

        context "with sparse fieldset" do
          let("fields[location]") { "name,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/get-location-sparse-fieldset")
          end
        end

        context "with relationships" do
          let("fields[location]") { "name,parent" }
          let(:includes) { "parent" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/get-location-include-relationships")
          end
        end
      end
    end
  end
end
