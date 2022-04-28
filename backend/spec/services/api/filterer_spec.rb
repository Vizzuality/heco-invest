require "rails_helper"

RSpec.describe API::Filterer do
  subject { described_class.new(query, filters) }

  describe "#call" do
    let(:filters) do
      {category: "sustainable-agrosystems",
       impacts: "climate",
       sdg: [2, 3],
       instrument_type: "loan",
       ticket_size: "scaling",
       only_verified: false}
    end

    describe "used with Project query" do
      let(:query) { Project.all }

      context "when searched by enum filters" do
        let!(:correct_project) do
          create :project, category: "sustainable-agrosystems", sdgs: [1, 2], instrument_types: ["loan"], ticket_size: "scaling"
        end
        let!(:different_category_project) { create :project, category: "tourism-and-recreation" }
        let!(:different_sdgs_project) { create :project, sdgs: [4, 5] }
        let!(:different_instrument_type_project) { create :project, instrument_types: ["grant"] }
        let!(:different_ticket_size_project) { create :project, ticket_size: "prototyping" }

        it "#returns only correct projects" do
          expect(subject.call).to eq([correct_project])
        end
      end
    end

    describe "used with Project Developer query" do
      let(:query) { ProjectDeveloper.all }

      context "when searched by enum filters" do
        let!(:correct_project_developer) do
          create :project_developer, categories: ["sustainable-agrosystems"], impacts: ["climate"]
        end
        let!(:different_category_project_developer) { create :project_developer, categories: ["tourism-and-recreation"] }
        let!(:different_impact_project_developer) { create :project_developer, impacts: ["water"] }

        it "#returns only correct project developers" do
          expect(subject.call).to eq([correct_project_developer])
        end
      end

      context "when searched by only verified flag" do
        let(:filters) { {only_verified: true} }
        let!(:verified_project_developer) { create :project_developer, review_status: :approved }
        let!(:unverified_project_developer) { create :project_developer, review_status: :unapproved }

        it "#returns only verified records" do
          expect(subject.call).to eq([verified_project_developer])
        end
      end
    end

    describe "used with Open Call query" do
      let(:query) { OpenCall.all }

      context "when searched by enum filters" do
        let!(:correct_open_call) do
          create :open_call, sdgs: [1, 2], instrument_type: "loan", ticket_size: "scaling"
        end
        let!(:different_sdgs_open_call) { create :open_call, sdgs: [4, 5] }
        let!(:different_instrument_type_open_call) { create :open_call, instrument_type: "grant" }
        let!(:different_ticket_size_open_call) { create :open_call, ticket_size: "prototyping" }

        it "#returns only correct open calls" do
          expect(subject.call).to eq([correct_open_call])
        end
      end
    end

    describe "used with Investor query" do
      let(:query) { Investor.all }

      context "when searched by enum filters" do
        let!(:correct_investor) do
          create :investor, categories: ["sustainable-agrosystems"], sdgs: [1, 2], instrument_types: ["loan"],
            ticket_sizes: ["scaling"], impacts: ["climate"]
        end
        let!(:different_category_investor) { create :investor, categories: ["tourism-and-recreation"] }
        let!(:different_sdgs_investor) { create :investor, sdgs: [4, 5] }
        let!(:different_instrument_type_investor) { create :investor, instrument_types: ["grant"] }
        let!(:different_ticket_size_investor) { create :investor, ticket_sizes: ["prototyping"] }
        let!(:different_ticket_size_investor) { create :investor, impacts: ["water"] }

        it "#returns only correct investors" do
          expect(subject.call).to eq([correct_investor])
        end
      end

      context "when searched by only verified flag" do
        let(:filters) { {only_verified: true} }
        let!(:verified_investor) { create :investor, review_status: :approved }
        let!(:unverified_investor) { create :investor, review_status: :unapproved }

        it "#returns only verified records" do
          expect(subject.call).to eq([verified_investor])
        end
      end
    end
  end
end
