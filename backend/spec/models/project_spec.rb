require "rails_helper"

RSpec.describe Project, type: :model do
  include ActiveJob::TestHelper

  subject { build(:project) }

  it_behaves_like :searchable
  it_behaves_like :translatable

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

  it "should not be valid without trusted" do
    subject.trusted = nil
    expect(subject).to have(1).errors_on(:trusted)
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

  it "should precompute center with valid geometry" do
    subject.geometry = {type: "Point", coordinates: [100.0, 0.0]}
    expect(subject).to be_valid
    expect(subject.center.y).to eq(0.0)
    expect(subject.center.x).to eq(100.0)
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
    let!(:project) { create :project }

    context "when geometry changes" do
      it "enqueues impact calculation job" do
        assert_enqueued_with job: ImpactCalculationJob, args: [project] do
          project.geometry = {type: "Polygon", coordinates: [[[0.3, 0.3], [1.3, 0.3], [1.3, 1.3], [0.3, 1.3]]]}
          project.save!
        end
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
end
