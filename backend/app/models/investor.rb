class Investor < ApplicationRecord
  include BelongsToAccount
  include Reviewable

  has_many :open_calls, dependent: :destroy

  validates :categories, array_inclusion: {in: Category::TYPES}, presence: true
  validates :instrument_types, array_inclusion: {in: InstrumentType::TYPES}, presence: true
  validates :ticket_sizes, array_inclusion: {in: TicketSize::TYPES}, presence: true
  validates :impacts, array_inclusion: {in: Impact::TYPES}
  validates :sdgs, array_inclusion: {in: Sdg::TYPES}
  validates :investor_type, inclusion: {in: InvestorType::TYPES}
  validates :language, inclusion: {in: (I18n.available_locales - [:zu]).map(&:to_s)}
  validates :previously_invested, inclusion: {in: [true, false]}

  validates_presence_of :how_do_you_work, :other_information

  translates :how_do_you_work, :what_makes_the_difference, :other_information, :previously_invested_description
end
