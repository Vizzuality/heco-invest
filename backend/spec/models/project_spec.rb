require "rails_helper"

RSpec.describe Project, type: :model do
  include ActiveJob::TestHelper

  subject { build(:project) }

  it_behaves_like :searchable
  it_behaves_like :translatable
  it_behaves_like :with_ransacked_translations
  it_behaves_like :with_ransacked_static_types, :category

  it { is_expected.to be_valid }

  it "should not be valid without project developer" do
    subject.project_developer = nil
    expect(subject).to have(1).errors_on(:project_developer)
  end

  it "should not be valid with wrong language" do
    subject.language = "fr"
    expect(subject).to have(1).errors_on(:language)
  end

  it "should not be valid without language" do
    subject.language = nil
    expect(subject).to have(1).errors_on(:language)
  end

  it "should not be valid without name" do
    subject.name = nil
    expect(subject).to have(1).errors_on(:name)
  end

  it "should not be valid without estimated duration in months" do
    subject.estimated_duration_in_months = nil
    expect(subject).to have(2).errors_on(:estimated_duration_in_months)
  end

  it "should not be valid with wrong esitmated duration in months" do
    subject.estimated_duration_in_months = 30.2
    expect(subject).to have(1).errors_on(:estimated_duration_in_months)
    subject.estimated_duration_in_months = -1
    expect(subject).to have(1).errors_on(:estimated_duration_in_months)
    subject.estimated_duration_in_months = 0
    expect(subject).to have(1).errors_on(:estimated_duration_in_months)
    subject.estimated_duration_in_months = 37
    expect(subject).to have(1).errors_on(:estimated_duration_in_months)
  end

  it "should not be valid without description" do
    subject.description = nil
    expect(subject).to have(1).errors_on(:description)
  end

  it "should not be valid without country" do
    subject.country = nil
    expect(subject).to have(1).errors_on(:country)
  end

  it "should not be valid without municipality" do
    subject.municipality = nil
    expect(subject).to have(1).errors_on(:municipality)
  end

  it "should not be valid without department" do
    subject.department = nil
    expect(subject).to have(1).errors_on(:department)
  end

  it "should not be valid without received funding" do
    subject.received_funding = nil
    expect(subject).to have(1).errors_on(:received_funding)
  end

  it "should not be valid without problem" do
    subject.problem = nil
    expect(subject).to have(1).errors_on(:problem)
  end

  it "should not be valid without solution" do
    subject.solution = nil
    expect(subject).to have(1).errors_on(:solution)
  end

  it "should not be valid without sustainability" do
    subject.sustainability = nil
    expect(subject).to have(1).errors_on(:sustainability)
  end

  it "should not be valid without replicability" do
    subject.replicability = nil
    expect(subject).to have(1).errors_on(:replicability)
  end

  it "should not be valid without expected impact" do
    subject.expected_impact = nil
    expect(subject).to have(1).errors_on(:expected_impact)
  end

  it "should not be valid without progress_impact_tracking" do
    subject.progress_impact_tracking = nil
    expect(subject).to have(1).errors_on(:progress_impact_tracking)
  end

  it "should not be valid without verified" do
    subject.verified = nil
    expect(subject).to have(1).errors_on(:verified)
  end

  it "should not be valid without received funding" do
    subject.received_funding = nil
    expect(subject).to have(1).errors_on(:received_funding)
  end

  it "should not be valid without looking for funding" do
    subject.looking_for_funding = nil
    expect(subject).to have(1).errors_on(:looking_for_funding)
  end

  it "should not be valid without funding plan" do
    subject.funding_plan = nil
    expect(subject).to have(1).errors_on(:funding_plan)
  end

  it "should not be valid with more than 6 project images" do
    subject.project_images = 7.times.map { build(:project_image) }
    expect(subject).to have(1).errors_on(:project_images)
  end

  it "should not be valid without geometry" do
    subject.geometry = nil
    expect(subject).to have(1).errors_on(:geometry)
  end

  it "should not be valid with non-json geometry" do
    subject.geometry = "wrong-geometry"
    expect(subject).to have(1).errors_on(:geometry)
  end

  it "should not be valid with non-geojson geometry" do
    subject.geometry = {geojson: false}
    expect(subject).to have(1).errors_on(:geometry)
  end

  it "should precompute centroid with valid geometry" do
    subject.geometry = {type: "Point", coordinates: [100.0, 0.0]}
    expect(subject).to be_valid
    expect(subject.centroid.y).to eq(0.0)
    expect(subject.centroid.x).to eq(100.0)
  end

  it "should not be valid for unsupported geometry type" do
    subject.geometry = {type: "LineString", coordinates: [[100.0, 0.0], [101.0, 1.0]]}
    expect(subject).to have(1).errors_on(:geometry)
  end

  it "should not be valid for empty geometry" do
    subject.geometry = {type: "FeatureCollection", features: []}
    expect(subject).to have(1).errors_on(:geometry)
  end

  include_examples :static_relation_validations, attribute: :development_stage, presence: true
  include_examples :static_relation_validations, attribute: :category, presence: true
  include_examples :static_relation_validations, attribute: :instrument_types, presence: true
  include_examples :static_relation_validations, attribute: :ticket_size, presence: true
  include_examples :static_relation_validations, attribute: :sdgs, presence: true
  include_examples :static_relation_validations, attribute: :target_groups, presence: true
  include_examples :static_relation_validations, attribute: :impact_areas, presence: true

  context "without received funding" do
    subject {
      build(:project, received_funding: false, received_funding_amount_usd: 4000, received_funding_investor: "Investor")
    }

    it "should clear received funding fields" do
      subject.validate
      expect(subject.received_funding_amount_usd).to be_nil
      expect(subject.received_funding_investor).to be_nil
    end

    it "should be valid without received funding amount" do
      subject.received_funding_amount_usd = nil
      expect(subject).to be_valid
    end

    it "should be valid without received funding investor" do
      subject.received_funding_investor = nil
      expect(subject).to be_valid
    end
  end

  context "without looking for funding" do
    subject {
      build(:project, looking_for_funding: false, ticket_size: "scaling", instrument_types: ["loan"], funding_plan: "Plan")
    }

    it "should clear looking for funding fields" do
      subject.validate
      expect(subject.ticket_size).to be_nil
      expect(subject.instrument_types).to be_nil
      expect(subject.funding_plan).to be_nil
    end

    it "should be valid without ticket size" do
      subject.ticket_size = nil
      expect(subject).to be_valid
    end

    it "should save correctly without ticket size" do
      subject.ticket_size = nil
      expect { subject.save! }.not_to raise_error
    end

    it "should be valid without instrument types" do
      subject.instrument_types = nil
      expect(subject).to be_valid
    end

    it "should be valid without funding plan" do
      subject.funding_plan = nil
      expect(subject).to be_valid
    end
  end

  context "locations" do
    it "should not be valid if mismatched location type for country" do
      subject.country = create(:department)
      expect(subject).to have(1).errors_on(:country)
    end

    it "should not be valid if mismatched location type for department" do
      subject.department = create(:country)
      expect(subject).to have(1).errors_on(:department)
    end

    it "should not be valid if mismatched location type for municipality" do
      subject.municipality = create(:department)
      expect(subject).to have(1).errors_on(:municipality)
    end
  end

  describe "#calculate_impacts" do
    let!(:project) { create :project, impact_calculated: true }

    context "when geometry changes" do
      it "enqueues impact calculation job" do
        assert_enqueued_with job: ImpactCalculationJob, args: [project] do
          project.geometry = {type: "Polygon", coordinates: [[[0.3, 0.3], [1.3, 0.3], [1.3, 1.3], [0.3, 1.3]]]}
          project.save!
        end
      end

      it "resets impact_calculated attribute" do
        project.update! geometry: {type: "Polygon", coordinates: [[[0.3, 0.3], [1.3, 0.3], [1.3, 1.3], [0.3, 1.3]]]}
        expect(project.reload.impact_calculated).to be_falsey
      end
    end

    context "when impact areas" do
      it "enqueues impact calculation job" do
        assert_enqueued_with job: ImpactCalculationJob, args: [project] do
          project.impact_areas = ["hydrometerological-risk-reduction"]
          project.save!
        end
      end
    end

    context "when any other attribute changes" do
      it "does not enqueue impact calculation job" do
        assert_no_enqueued_jobs only: ImpactCalculationJob do
          project.name = "NEW NAME"
          project.save!
        end
      end
    end
  end

  describe "#assign_priority_landscape" do
    let(:project) { create :project, geometry: geometry }
    let!(:location) do
      create :location, :with_geometry, location_type: :priority_landscape,
        geometry: RGeo::GeoJSON.decode({type: "Polygon", coordinates: [[[-10, -10], [10, -10], [10, 10], [-10, 10]]]}.to_json)
    end

    context "when geometry of project is inside defined priority landscape" do
      let(:geometry) { {type: "Polygon", coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1]]]} }

      it "assigns correct priority landscape to project" do
        expect(project.priority_landscape).to eq(location)
      end
    end

    context "when geometry of project is outside of defined priority landscape" do
      let(:geometry) { {type: "Polygon", coordinates: [[[-100, -100], [-99, -100], [-99, -99], [-100, -99]]]} }

      it "does not assign any priority landscape to project" do
        expect(project.priority_landscape).to be_nil
      end
    end
  end

  describe "ransacker" do
    describe "#category_index" do
      before do
        create(:project, category: "sustainable-agrosystems")
        create(:project, category: "tourism-and-recreation")
        create(:project, category: "forestry-and-agroforestry")
      end

      context "sort" do
        it "correctly by category name asc" do
          q = Project.ransack
          q.sorts = "category_localized asc"
          expect(q.result.pluck(:category)).to eq(["forestry-and-agroforestry", "sustainable-agrosystems", "tourism-and-recreation"])
        end

        it "correctly by category name desc" do
          q = Project.ransack
          q.sorts = "category_localized desc"
          expect(q.result.pluck(:category)).to eq(["tourism-and-recreation", "sustainable-agrosystems", "forestry-and-agroforestry"])
        end
      end
    end
  end

  describe "#notify_project_developers" do
    let(:project_developer) { create :project_developer }
    let(:removed_project_developer) { create :project_developer }
    let(:new_project_developer) { create :project_developer }
    let!(:project) { create :project, involved_project_developers: [project_developer, removed_project_developer] }

    context "when project developers are modified on published project" do
      it "notifies all added project developers" do
        expect {
          project.update! involved_project_developers: [new_project_developer]
        }.to have_enqueued_mail(ProjectDeveloperMailer, :added_to_project).with(new_project_developer, project)
      end

      it "notifies all removed project developers" do
        expect {
          project.update! involved_project_developers: [project_developer]
        }.to have_enqueued_mail(ProjectDeveloperMailer, :removed_from_project).with(removed_project_developer, project)
      end
    end

    context "when project gets published" do
      before { project.update! status: :draft }

      it "notifies all involved project developers" do
        expect {
          project.update! involved_project_developers: [project_developer, new_project_developer], status: :published
        }.to have_enqueued_mail(ProjectDeveloperMailer, :added_to_project).with(project_developer, project).once
          .and have_enqueued_mail(ProjectDeveloperMailer, :added_to_project).with(new_project_developer, project).once
      end

      it "does not notify removed project developers" do
        expect {
          project.update! involved_project_developers: [], status: :published
        }.not_to have_enqueued_mail(ProjectDeveloperMailer, :removed_from_project)
      end

      it "does not notify project developers when status of project does not change" do
        expect {
          project.update! involved_project_developers: [project_developer, new_project_developer]
        }.not_to have_enqueued_mail(ProjectDeveloperMailer, :added_to_project)
      end
    end
  end
end
