class OpenCall < ApplicationRecord
  extend FriendlyId
  include Translatable
  include Searchable

  friendly_id :investor_prefixed_name, use: :slugged

  belongs_to :investor, counter_cache: true

  belongs_to :country, class_name: "Location"
  belongs_to :municipality, class_name: "Location", optional: true
  belongs_to :department, class_name: "Location", optional: true

  has_many :favourite_open_calls, dependent: :destroy

  has_one_attached :picture

  translates :name,
    :description,
    :funding_priorities,
    :funding_exclusions,
    :impact_description

  enum status: OpenCallStatus::TYPES_WITH_CODE, _default: :launched
  ransacker :status, formatter: proc { |v| statuses[v] }

  validates :instrument_types, array_inclusion: {in: InstrumentType::TYPES}, presence: true
  validates :sdgs, array_inclusion: {in: Sdg::TYPES}
  validates :language, inclusion: {in: Language::TYPES, allow_blank: true}, presence: true

  validates :maximum_funding_per_project, numericality: {only_integer: true, greater_than: 0}, presence: true

  validates_presence_of :name, :description, :funding_priorities, :funding_exclusions, :impact_description, :closing_at

  validates :trusted, inclusion: [true, false]

  validates_uniqueness_of [*locale_columns(:name)], scope: [:investor_id], case_sensitive: false, allow_blank: true
  validate :location_types

  delegate :account_language, to: :investor, allow_nil: true

  def investor_prefixed_name
    "#{investor&.name} #{original_name}"
  end

  def original_name
    I18n.with_locale(language) { name }
    # to prevent crashing validations because of setting slug, fallback just to current locale name
  rescue I18n::InvalidLocale
    name
  end

  private

  def location_types
    errors.add :country, :location_type_mismatch if country && country.location_type != "country"
    errors.add :municipality, :location_type_mismatch if municipality && municipality.location_type != "municipality"
    errors.add :department, :location_type_mismatch if department && department.location_type != "department"
  end
end
