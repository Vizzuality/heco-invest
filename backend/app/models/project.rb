class Project < ApplicationRecord
  extend FriendlyId
  include Translatable
  include Searchable
  include ExtraRansackers

  friendly_id :project_developer_prefixed_name, use: :slugged

  belongs_to :project_developer, counter_cache: true

  belongs_to :country, class_name: "Location"
  belongs_to :municipality, class_name: "Location"
  belongs_to :department, class_name: "Location"
  belongs_to :priority_landscape, class_name: "Location", optional: true

  has_many :project_images, dependent: :destroy
  has_many :favourite_projects, dependent: :destroy
  has_many :project_involvements, dependent: :destroy
  has_many :involved_project_developers, through: :project_involvements, source: :project_developer, dependent: :destroy
  has_many :open_call_applications, dependent: :destroy
  has_many :open_calls, through: :open_call_applications
  has_many :investors, through: :open_calls

  has_and_belongs_to_many :funded_investors, join_table: "funded_projects", class_name: "Investor", dependent: :destroy

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

  enum status: ProjectStatus::TYPES_WITH_CODE, _default: :published
  ransacker :status, formatter: proc { |v| statuses[v] }

  validates :development_stage, inclusion: {in: ProjectDevelopmentStage::TYPES, allow_blank: true}, presence: true
  validates :category, inclusion: {in: Category::TYPES, allow_blank: true}, presence: true
  validates :sdgs, array_inclusion: {in: Sdg::TYPES}, presence: true
  validates :language, inclusion: {in: Language::TYPES, allow_blank: true}, presence: true
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

  validates :estimated_duration_in_months, numericality: {only_integer: true, greater_than: 0, less_than: 37}, presence: true
  validates :verified, inclusion: [true, false]
  validates :received_funding, inclusion: [true, false]
  validates :looking_for_funding, inclusion: [true, false]
  validates :project_images, length: {maximum: 6}

  with_options if: -> { looking_for_funding? } do
    validates :instrument_types, array_inclusion: {in: InstrumentType::TYPES}, presence: true
    validates :ticket_size, inclusion: {in: TicketSize::TYPES, allow_blank: true}, presence: true
    validates_presence_of :funding_plan
  end

  validates_uniqueness_of [*locale_columns(:name)], scope: [:project_developer_id], case_sensitive: false, allow_blank: true
  validate :location_types
  validates_with ProjectGeometryValidator

  before_validation :clear_funding_fields, unless: -> { looking_for_funding? }
  before_validation :clear_received_funding_fields, unless: -> { received_funding? }
  before_save :assign_priority_landscape, if: :centroid_changed?
  after_save :recalculate_impacts, if: -> { saved_change_to_geometry? || saved_change_to_impact_areas? }
  after_save :notify_project_developers, if: -> { saved_change_to_status? && published? }

  accepts_nested_attributes_for :project_images, reject_if: :all_blank, allow_destroy: true

  delegate :account_language, to: :project_developer, allow_nil: true

  generate_ransackers_for_translated_columns
  generate_localized_ransackers_for_static_types :category

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

  def assign_priority_landscape
    self.priority_landscape = centroid.blank? ? nil : LocationGeometry.of_type(:priority_landscape).intersection_with(centroid).first&.location
  end

  def recalculate_impacts
    reset_impacts
    ImpactCalculationJob.perform_later self
  end

  def reset_impacts
    impact_columns = {impact_calculated: false}
    %w[municipality hydrobasin priority_landscape].each do |impact_type|
      %w[biodiversity climate water community total].each do |impact_area|
        impact_columns["#{impact_type}_#{impact_area}_impact"] = nil
      end
    end
    update_columns impact_columns
  end

  def notify_project_developers
    involved_project_developers.each do |project_developer|
      ProjectDeveloperMailer.added_to_project(project_developer, self).deliver_later
    end
  end
end
