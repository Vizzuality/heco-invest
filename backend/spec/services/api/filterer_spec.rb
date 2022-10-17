require "rails_helper"

RSpec.describe API::Filterer do
  subject { described_class.new(query, filters) }

  describe "#call" do
    let(:filters) do
      {category: "sustainable-agrosystems",
       impacts: "climate",
       sdg: "2,3",
       instrument_type: "loan",
       ticket_size: "scaling",
       only_verified: false}
    end

    describe "used with Project query" do
      let(:query) { Project.all }

      context "when filtered by enum filters" do
        let!(:correct_project) do
          create :project, category: "sustainable-agrosystems", sdgs: [1, 2], instrument_types: ["loan"], ticket_size: "scaling"
        end
        let!(:different_category_project) { create :project, category: "tourism-and-recreation" }
        let!(:different_sdgs_project) { create :project, sdgs: [4, 5] }
        let!(:different_instrument_type_project) { create :project, instrument_types: ["grant"] }
        let!(:different_ticket_size_project) { create :project, ticket_size: "prototyping" }

        it "returns only correct projects" do
          expect(subject.call).to eq([correct_project])
        end
      end

      context "when filtered by only verified flag" do
        let(:filters) { {only_verified: true} }
        let!(:verified_project) { create :project, verified: true }
        let!(:unverified_project) { create :project, verified: false }

        it "returns only verified records" do
          expect(subject.call).to eq([verified_project])
        end
      end

      context "when filtered by full_text param" do
        let(:filters) { {full_text: "TEST", language: :en} }
        let!(:correct_project) { create :project, name_en: "TEST" }
        let!(:different_language_project) { create :project, name_es: "TEST" }
        let!(:different_text_project) { create :project, name_en: "DIFFERENT" }

        it "returns only records with correct text in correct language" do
          expect(subject.call).to match_array([correct_project])
        end
      end

      context "when filtered by partial prefix full_text param" do
        before(:each) do
          allow(Project).to receive(:translatable_attributes).and_return([:name])
        end
        let(:filters) { {full_text: "ba", language: :en} }
        let!(:correct_project_en) { create :project, name_en: "yellow banana", language: :en }
        let!(:correct_project_es) {
          create :project, name_es: "plátano amarillo", name_en: "yellow banana", language: :es
        }
        let!(:incorrect_project) { create :project, name_en: "red apple", language: :en }

        it "returns only records with correct text in correct language" do
          expect(subject.call).to match_array([correct_project_en, correct_project_es])
        end
      end

      context "when filtered by partial non-prefix full_text param" do
        before(:each) do
          allow(Project).to receive(:translatable_attributes).and_return([:name])
        end
        let(:filters) { {full_text: "na", language: :en} }
        let!(:in_correct_project_en) { create :project, name_en: "yellow banana", language: :en }
        let!(:in_correct_project_es) {
          create :project, name_es: "plátano amarillo", name_en: "yellow banana", language: :es
        }

        it "returns only records with correct text in correct language" do
          expect(subject.call).to match_array([])
        end
      end

      context "when filtered by impact" do
        let(:filters) { {impact: "climate,water"} }
        let!(:project_with_water_impact) { create :project, municipality_water_impact: 0.2 }
        let!(:project_with_climate_impact) { create :project, municipality_climate_impact: 0.4 }
        let!(:project_with_biodiversity_impact) { create :project, municipality_biodiversity_impact: 0.4 }
        let!(:project_without_municipality_impact) { create :project, priority_landscape_climate_impact: 0.2 }

        it "returns only records with correct impact values" do
          expect(subject.call).to include(project_with_water_impact)
          expect(subject.call).to include(project_with_climate_impact)
          expect(subject.call).not_to include(project_with_biodiversity_impact)
          expect(subject.call).not_to include(project_without_municipality_impact)
        end
      end

      context "when filtered by priority landscape" do
        let(:filters) { {priority_landscape: priority_landscape.id} }

        let(:geometry) { {type: "Polygon", coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1]]]} }
        let(:different_geometry) { {type: "Polygon", coordinates: [[[100, 100], [101, 100], [101, 101], [100, 101]]]} }
        let!(:priority_landscape) do
          create :location, :with_geometry, location_type: :priority_landscape, geometry: RGeo::GeoJSON.decode(geometry.to_json)
        end
        let!(:different_priority_landscape) do
          create :location, :with_geometry, location_type: :priority_landscape, geometry: RGeo::GeoJSON.decode(different_geometry.to_json)
        end
        let!(:correct_project) { create :project, geometry: geometry }
        let!(:project_at_different_location) { create :project, geometry: different_geometry }
        let!(:project_without_priority_landscape) do
          create :project, geometry: {type: "Polygon", coordinates: [[[1000, 1000], [1010, 1000], [1010, 1010], [1000, 1010]]]}
        end

        it "returns only records with correct priority landscape" do
          expect(subject.call).to eq([correct_project])
        end
      end
    end

    describe "used with Project Developer query" do
      let(:query) { ProjectDeveloper.all }

      context "when filtered by enum filters" do
        let!(:correct_project_developer) do
          create :project_developer, categories: ["sustainable-agrosystems"], impacts: ["climate"]
        end
        let!(:different_category_project_developer) { create :project_developer, categories: ["tourism-and-recreation"] }
        let!(:different_impact_project_developer) { create :project_developer, impacts: ["water"] }

        it "returns only correct project developers" do
          expect(subject.call).to eq([correct_project_developer])
        end
      end

      context "when filtered by full_text param" do
        let(:filters) { {full_text: "TEST", language: :en} }
        let!(:correct_project_developer) { create :project_developer, mission_en: "TEST" }
        let!(:different_language_project_developer) { create :project_developer, mission_es: "TEST" }
        let!(:different_text_project_developer) { create :project_developer, mission_en: "DIFFERENT" }

        it "returns only records with correct text at correct language" do
          expect(subject.call).to eq([correct_project_developer])
        end
      end

      context "when filtered by full_text param which is at different table" do
        let(:filters) { {full_text: "TEST", language: :en} }
        let!(:correct_project_developer) { create :project_developer, account: (create :account, name: "TEST") }
        let!(:different_text_project_developer) { create :project_developer, account: (create :account, name: "DIFFERENT") }

        it "returns only correct project developers" do
          expect(subject.call).to eq([correct_project_developer])
        end
      end

      context "when filtered by priority landscape" do
        let!(:priority_landscape_1) { create :location, :with_geometry, location_type: :priority_landscape }
        let!(:priority_landscape_2) { create :location, :with_geometry, location_type: :priority_landscape }
        let!(:priority_landscape_3) { create :location, :with_geometry, location_type: :priority_landscape }
        let!(:project_developer_1) { create :project_developer, priority_landscapes: [priority_landscape_1] }
        let!(:project_developer_2) { create :project_developer, priority_landscapes: [priority_landscape_2, priority_landscape_3] }
        let!(:project_developer_3) { create :project_developer, priority_landscapes: [priority_landscape_3] }

        context "when filtered by one priority landscape which have only one result" do
          let(:filters) { {priority_landscape: priority_landscape_1.id} }

          it "returns only records with correct priority landscape" do
            expect(subject.call).to eq([project_developer_1])
          end
        end

        context "when filtered by one priority landscape which have multiple result" do
          let(:filters) { {priority_landscape: priority_landscape_3.id} }

          it "returns only records with correct priority landscape" do
            expect(subject.call).not_to include(project_developer_1)
            expect(subject.call).to include(project_developer_2)
            expect(subject.call).to include(project_developer_3)
          end
        end

        context "when filtered by multiple priority landscapes" do
          let(:filters) { {priority_landscape: "#{priority_landscape_1.id},#{priority_landscape_2.id}"} }

          it "returns only records with correct priority landscape" do
            expect(subject.call).to include(project_developer_1)
            expect(subject.call).to include(project_developer_2)
            expect(subject.call).not_to include(project_developer_3)
          end
        end
      end
    end

    describe "used with Open Call query" do
      let(:query) { OpenCall.all }

      context "when filtered by enum filters" do
        let!(:correct_open_call) { create :open_call, sdgs: [1, 2], instrument_types: ["loan"] }
        let!(:different_sdgs_open_call) { create :open_call, sdgs: [4, 5] }
        let!(:different_instrument_type_open_call) { create :open_call, instrument_types: ["grant"] }

        it "returns only correct open calls" do
          expect(subject.call).to eq([correct_open_call])
        end
      end

      context "when filtered by only verified flag" do
        let(:filters) { {only_verified: true} }
        let!(:verified_open_call) { create :open_call, verified: true }
        let!(:unverified_open_call) { create :open_call, verified: false }

        it "returns only verified records" do
          expect(subject.call).to eq([verified_open_call])
        end
      end

      context "when filtered by full_text param" do
        let(:filters) { {full_text: "TEST", language: :en} }
        let!(:correct_open_call) { create :open_call, description_en: "TEST" }
        let!(:different_language_open_call) { create :open_call, description_es: "TEST" }
        let!(:different_text_open_call) { create :open_call, description_en: "DIFFERENT" }
        let!(:ignored_column_open_call) { create :open_call, funding_exclusions_en: "TEST" }

        it "returns only records with correct text at correct language" do
          expect(subject.call).to eq([correct_open_call])
        end
      end
    end

    describe "used with Investor query" do
      let(:query) { Investor.all }

      context "when filtered by enum filters" do
        let!(:correct_investor) do
          create :investor, categories: ["sustainable-agrosystems"], sdgs: [1, 2], instrument_types: ["loan"],
            ticket_sizes: ["scaling"], impacts: ["climate"]
        end
        let!(:different_category_investor) { create :investor, categories: ["tourism-and-recreation"] }
        let!(:different_sdgs_investor) { create :investor, sdgs: [4, 5] }
        let!(:different_instrument_type_investor) { create :investor, instrument_types: ["grant"] }
        let!(:different_ticket_size_investor) { create :investor, ticket_sizes: ["prototyping"] }
        let!(:different_ticket_size_investor) { create :investor, impacts: ["water"] }

        it "returns only correct investors" do
          expect(subject.call).to eq([correct_investor])
        end
      end

      context "when filtered by full_text param" do
        let(:filters) { {full_text: "TEST", language: :en} }
        let!(:correct_investor) { create :investor, mission_en: "TEST" }
        let!(:different_language_investor) { create :investor, mission_es: "TEST" }
        let!(:different_text_investor) { create :investor, mission_en: "DIFFERENT" }

        it "returns only records with correct text at correct language" do
          expect(subject.call).to eq([correct_investor])
        end
      end

      context "when filtered by full_text param which is at different table" do
        let(:filters) { {full_text: "TEST", language: :en} }
        let!(:correct_investor) { create :investor, account: (create :account, name: "TEST") }
        let!(:different_text_project_developer) { create :investor, account: (create :account, name: "DIFFERENT") }

        it "returns only correct project developers" do
          expect(subject.call).to eq([correct_investor])
        end
      end
    end
  end
end
