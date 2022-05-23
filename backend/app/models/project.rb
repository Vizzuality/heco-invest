class Project < ApplicationRecord
  extend FriendlyId
  include Translatable
  include Searchable

  friendly_id :project_developer_prefixed_name, use: :slugged

  belongs_to :project_developer

  belongs_to :country, class_name: "Location"
  belongs_to :municipality, class_name: "Location"
  belongs_to :department, class_name: "Location"

  has_and_belongs_to_many :involved_project_developers, join_table: "project_involvements", class_name: "ProjectDeveloper"

  has_many :project_images, dependent: :destroy
  has_many :favourite_projects, dependent: :destroy

  translates :name,
    :description,
    :expected_impact,
    :problem,
    :solution,
    :sustainability,
    :replicability,
    :funding_plan,
    :progress_impact_tracking,
    :relevant_links

  enum status: {draft: 0, published: 1, closed: 2}, _default: :draft

  validates :development_stage, inclusion: {in: ProjectDevelopmentStage::TYPES}
  validates :category, inclusion: {in: Category::TYPES}
  validates :sdgs, array_inclusion: {in: Sdg::TYPES}, presence: true
  validates :language, inclusion: {in: Language::TYPES}
  validates :target_groups, array_inclusion: {in: ProjectTargetGroup::TYPES}, presence: true
  validates :impact_areas, array_inclusion: {in: ImpactArea::TYPES}, presence: true

  validates_presence_of :name,
    :description,
    :problem,
    :solution,
    :expected_impact,
    :sustainability,
    :replicability,
    :progress_impact_tracking,
    :geometry

  validates :estimated_duration_in_months, numericality: {only_integer: true, greater_than: 0}, presence: true
  validates :trusted, inclusion: [true, false]
  validates :received_funding, inclusion: [true, false]
  validates :looking_for_funding, inclusion: [true, false]
  validates :project_images, length: {maximum: 6}

  with_options if: -> { looking_for_funding? } do
    validates :instrument_types, array_inclusion: {in: InstrumentType::TYPES}, presence: true
    validates :ticket_size, inclusion: {in: TicketSize::TYPES}
    validates_presence_of :funding_plan
  end

  validates_uniqueness_of [*locale_columns(:name)], scope: [:project_developer_id], case_sensitive: false, allow_blank: true
  validate :location_types
  validates_with ProjectGeometryValidator

  before_validation :clear_funding_fields, unless: -> { looking_for_funding? }
  before_validation :clear_received_funding_fields, unless: -> { received_funding? }

  accepts_nested_attributes_for :project_images, reject_if: :all_blank, allow_destroy: true

  def project_developer_prefixed_name
    "#{project_developer&.name} #{original_name}"
  end

  def original_name
    I18n.with_locale(language) { name }
    # to prevent crashing validations because of setting slug, fallback just to current locale name
  rescue I18n::InvalidLocale
    name
  end

  private

  def clear_funding_fields
    self.funding_plan = nil
    self.ticket_size = nil
    self.instrument_types = nil
  end

  def clear_received_funding_fields
    self.received_funding_amount_usd = nil
    self.received_funding_investor = nil
  end

  def location_types
    errors.add :country, :location_type_mismatch if country && country.location_type != "country"
    errors.add :municipality, :location_type_mismatch if municipality && municipality.location_type != "municipality"
    errors.add :department, :location_type_mismatch if department && department.location_type != "department"
  end
end
