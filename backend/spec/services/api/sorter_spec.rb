require "rails_helper"

RSpec.describe API::Sorter do
  subject { described_class.new(query, sorting_by: sort_param) }

  describe "#call" do
    describe "used with Project query" do
      let(:query) { Project.all }
      let!(:project_1) { create :project, name: "AAAAA", created_at: 10.days.from_now }
      let!(:project_2) { create :project, name: "BBBBB", created_at: 1.days.from_now }

      before do
        project_1.update! municipality_total_impact: 0.1
        project_2.update! municipality_total_impact: 0.2
      end

      context "when sorted by name" do
        let(:sort_param) { "name desc" }

        it "returns correct order of records" do
          expect(subject.call.to_a).to eq([project_2, project_1])
        end
      end

      context "when sorted by created_at" do
        let(:sort_param) { "created_at asc" }

        it "returns correct order of records" do
          expect(subject.call.to_a).to eq([project_2, project_1])
        end
      end

      context "when sorted by municipality_total_impact" do
        let(:sort_param) { "municipality_total_impact desc" }

        it "returns correct order of records" do
          expect(subject.call.to_a).to eq([project_2, project_1])
        end
      end

      context "when sorting_by is empty" do
        let(:sort_param) { nil }

        it "keeps default records order" do
          expect(subject.call.to_a).to eq([project_1, project_2])
        end
      end

      context "when sorting_by contains wrong data" do
        let(:sort_param) { "WRONG DATA WRONG" }

        it "keeps default records order" do
          expect(subject.call.to_a).to eq([project_1, project_2])
        end
      end

      context "when names are same and default sorting is used" do
        let(:sort_param) { "name desc" }
        let!(:project_2) { create :project, name: project_1.name, created_at: 1.days.from_now }

        it "returns correct order of records" do
          expect(subject.call.to_a).to eq([project_1, project_2])
        end
      end
    end

    describe "used with Project Developer query" do
      let(:query) { ProjectDeveloper.all }
      let!(:account_1) { create :account, name: "AAAAA" }
      let!(:account_2) { create :account, name: "BBBBB" }
      let!(:project_developer_1) { create :project_developer, account: account_1, created_at: 10.days.from_now }
      let!(:project_developer_2) { create :project_developer, account: account_2, created_at: 1.days.from_now }

      context "when sorted by name" do
        let(:sort_param) { "name desc" }

        it "returns correct order of records" do
          expect(subject.call.to_a).to eq([project_developer_2, project_developer_1])
        end
      end

      context "when sorted by created_at" do
        let(:sort_param) { "created_at asc" }

        it "returns correct order of records" do
          expect(subject.call.to_a).to eq([project_developer_2, project_developer_1])
        end
      end

      context "when sorting_by is empty" do
        let(:sort_param) { nil }

        it "keeps default records order" do
          expect(subject.call.to_a).to eq([project_developer_1, project_developer_2])
        end
      end

      context "when sorted by attribute which is supported by sorter but it is missing at appropriate table" do
        let(:sort_param) { "municipality_total_impact desc" }

        it "keeps default records order" do
          expect(subject.call.to_a).to eq([project_developer_1, project_developer_2])
        end
      end
    end

    describe "used with Open Call query" do
      let(:query) { OpenCall.all }
      let!(:open_call_1) { create :open_call, name: "AAAAA", created_at: 10.days.from_now }
      let!(:open_call_2) { create :open_call, name: "BBBBB", created_at: 1.days.from_now }

      context "when sorted by name" do
        let(:sort_param) { "name desc" }

        it "returns correct order of records" do
          expect(subject.call.to_a).to eq([open_call_2, open_call_1])
        end
      end

      context "when sorted by created_at" do
        let(:sort_param) { "created_at asc" }

        it "returns correct order of records" do
          expect(subject.call.to_a).to eq([open_call_2, open_call_1])
        end
      end

      context "when sorting_by is empty" do
        let(:sort_param) { nil }

        it "keeps default records order" do
          expect(subject.call.to_a).to eq([open_call_1, open_call_2])
        end
      end
    end

    describe "used with Investor query" do
      let(:query) { Investor.all }
      let!(:account_1) { create :account, name: "AAAAA" }
      let!(:account_2) { create :account, name: "BBBBB" }
      let!(:investor_1) { create :investor, account: account_1, created_at: 10.days.from_now }
      let!(:investor_2) { create :investor, account: account_2, created_at: 1.days.from_now }

      context "when sorted by name" do
        let(:sort_param) { "name desc" }

        it "returns correct order of records" do
          expect(subject.call.to_a).to eq([investor_2, investor_1])
        end
      end

      context "when sorted by created_at" do
        let(:sort_param) { "created_at asc" }

        it "returns correct order of records" do
          expect(subject.call.to_a).to eq([investor_2, investor_1])
        end
      end

      context "when sorting_by is empty" do
        let(:sort_param) { nil }

        it "keeps default records order" do
          expect(subject.call.to_a).to eq([investor_1, investor_2])
        end
      end
    end
  end
end
