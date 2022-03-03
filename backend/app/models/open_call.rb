class OpenCall < ApplicationRecord
  extend FriendlyId
  friendly_id :investor_prefixed_name, use: :slugged

  belongs_to :investor

  validates :instrument_type, inclusion: {in: InstrumentType::TYPES, allow_blank: true}, presence: true
  validates :ticket_size, inclusion: {in: TicketSize::TYPES, allow_blank: true}, presence: true
  validates :sdgs, array_inclusion: {in: Sdg::TYPES}

  validates_presence_of :closing_at, :language

  translates :name, :description, :money_distribution, :impact_description

  def investor_prefixed_name
    "#{investor&.name} #{original_name}"
  end

  def original_name
    I18n.with_locale(language) { name }
  end
end
