class OpenCall < ApplicationRecord
  extend FriendlyId
  include Translatable
  include Searchable

  friendly_id :investor_prefixed_name, use: :slugged

  belongs_to :investor

  validates :instrument_type, inclusion: {in: InstrumentType::TYPES}
  validates :ticket_size, inclusion: {in: TicketSize::TYPES}
  validates :sdgs, array_inclusion: {in: Sdg::TYPES}
  validates :language, inclusion: {in: Language::TYPES}

  validates_presence_of :name, :description, :money_distribution, :impact_description, :closing_at

  validates :trusted, inclusion: [true, false]

  translates :name, :description, :money_distribution, :impact_description

  def investor_prefixed_name
    "#{investor&.name} #{original_name}"
  end

  def original_name
    I18n.with_locale(language) { name }
    # to prevent crashing validations because of setting slug, fallback just to current locale name
  rescue I18n::InvalidLocale
    name
  end
end
