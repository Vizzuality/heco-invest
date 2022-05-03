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
        let!(:verified_project) { create :project, trusted: true }
        let!(:unverified_project) { create :project, trusted: false }

        it "returns only verified records" do
          expect(subject.call).to eq([verified_project])
        end
      end

      context "when filtered by full_text param" do
        let(:filters) { {full_text: "TEST", language: :en} }
        let!(:correct_project) { create :project, name_en: "TEST" }
        let!(:different_language_project) { create :project, name_es: "TEST" }
        let!(:different_text_project) { create :project, name_en: "DIFFERENT" }

        it "returns only records with correct text at correct language" do
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
    end

    describe "used with Open Call query" do
      let(:query) { OpenCall.all }

      context "when filtered by enum filters" do
        let!(:correct_open_call) do
          create :open_call, sdgs: [1, 2], instrument_type: "loan", ticket_size: "scaling"
        end
        let!(:different_sdgs_open_call) { create :open_call, sdgs: [4, 5] }
        let!(:different_instrument_type_open_call) { create :open_call, instrument_type: "grant" }
        let!(:different_ticket_size_open_call) { create :open_call, ticket_size: "prototyping" }

        it "returns only correct open calls" do
          expect(subject.call).to eq([correct_open_call])
        end
      end

      context "when filtered by only verified flag" do
        let(:filters) { {only_verified: true} }
        let!(:verified_open_call) { create :open_call, trusted: true }
        let!(:unverified_open_call) { create :open_call, trusted: false }

        it "returns only verified records" do
          expect(subject.call).to eq([verified_open_call])
        end
      end

      context "when filtered by full_text param" do
        let(:filters) { {full_text: "TEST", language: :en} }
        let!(:correct_open_call) { create :open_call, description_en: "TEST" }
        let!(:different_language_open_call) { create :open_call, description_es: "TEST" }
        let!(:different_text_open_call) { create :open_call, description_en: "DIFFERENT" }
        let!(:ignored_collumn_open_call) { create :open_call, money_distribution_en: "TEST" }

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
        let!(:any_investor) { create :investor }

        it "does not influence filter at all" do
          expect(subject.call).to eq([any_investor])
        end
      end
    end
  end
end
