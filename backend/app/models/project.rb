class Project < ApplicationRecord
  extend FriendlyId
  friendly_id :project_developer_prefixed_name, use: :slugged

  belongs_to :project_developer

  enum status: {draft: 0, published: 1, closed: 2}, _default: :draft

  validates :categories, array_inclusion: {in: Category::TYPES}, presence: true
  validates :instrument_types, array_inclusion: {in: InstrumentType::TYPES}, presence: true
  validates :ticket_size, inclusion: {in: TicketSize::TYPES}
  validates :sdgs, array_inclusion: {in: Sdg::TYPES}
  validates :language, inclusion: {in: Language::TYPES}

  validates_presence_of :name, :description, :problem, :solution, :business_model,
    :sustainability, :impact_description, :roi, :income_in_last_3_years, :number_of_employees

  validates :trusted, inclusion: [true, false]
  validates :received_funding, inclusion: [true, false]

  translates :name, :description, :impact_description, :other_information,
    :problem, :solution, :business_model, :roi, :sustainability,
    :received_funding_description

  def project_developer_prefixed_name
    "#{project_developer&.name} #{original_name}"
  end

  def original_name
    I18n.with_locale(language) { name }
    # to prevent crashing validations because of setting slug, fallback just to current locale name
  rescue I18n::InvalidLocale
    name
  end
end
