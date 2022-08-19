require "swagger_helper"

RSpec.describe "API V1 Project Maps", type: :request do
  before_all do
    geometry = {type: "Polygon", coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1]]]}
    create :location, :with_geometry, location_type: :priority_landscape, geometry: RGeo::GeoJSON.decode(geometry.to_json)
    @project = create(:project, category: "non-timber-forest-production", geometry: geometry)
    create_list(:project, 6, category: "forestry-and-agroforestry")
    @unapproved_project = create(:project, project_developer: create(:project_developer, account: create(:account, :unapproved, users: [create(:user)])))
  end

  path "/api/v1/projects/map" do
    get "Returns list of the project geometries" do
      tags "Projects"
      produces "application/json"
      parameter name: "filter[category]", in: :query, type: :string, required: false, description: "Filter records. Use comma to separate multiple filter options."
      parameter name: "filter[sdg]", in: :query, type: :integer, required: false, description: "Filter records. Use comma to separate multiple filter options."
      parameter name: "filter[instrument_type]", in: :query, type: :string, required: false, description: "Filter records. Use comma to separate multiple filter options."
      parameter name: "filter[ticket_size]", in: :query, type: :string, required: false, description: "Filter records. Use comma to separate multiple filter options."
      parameter name: "filter[only_verified]", in: :query, type: :boolean, required: false, description: "Filter records."
      parameter name: "filter[full_text]", in: :query, type: :string, required: false, description: "Filter records by provided text."
      parameter name: "filter[priority_landscape]", in: :query, type: :string, required: false, description: "Filter records by ID. Use comma to separate multiple IDs."

      response "200", :success do
        schema type: :object, properties: {data: {
          type: :array,
          items: {
            type: :object,
            properties: {
              id: {type: :string},
              type: {type: :string},
              attributes: {
                type: :object,
                properties: {
                  trusted: {type: :boolean},
                  latitude: {type: :number},
                  longitude: {type: :number}
                }
              }
            },
            required: %w[id type attributes]
          }
        }}

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/project-maps")
        end

        it "ignores unapproved record" do
          expect(response_json["data"].pluck("id")).not_to include(@unapproved_project.id)
        end

        context "when filtering is used" do
          let("filter[category]") { @project.category }

          it "includes filtered project" do
            expect(response_json["data"].pluck("id")).to eq([@project.id])
          end
        end

        context "when filtered by searched text" do
          let("filter[full_text]") { @project.name }

          it "contains only correct records" do
            expect(response_json["data"].pluck("id")).to eq([@project.id])
          end
        end

        context "when filtered by association" do
          let("filter[priority_landscape]") { @project.priority_landscape.id }

          it "contains only correct records" do
            expect(response_json["data"].pluck("id")).to eq([@project.id])
          end
        end
      end
    end
  end
end
