class Investor < ApplicationRecord
  include BelongsToAccount
  include Reviewable

  validates :categories, array_inclusion: {in: Category::TYPES}, presence: true
  validates :impacts, array_inclusion: {in: Impact::TYPES}
  validates :instrument_types, array_inclusion: {in: InstrumentType::TYPES}, presence: true
  validates :investor_type, inclusion: {in: InvestorType::TYPES, allow_blank: true}, presence: true
  validates :ticket_sizes, array_inclusion: {in: TicketSize::TYPES}, presence: true
  validates :sdgs, array_inclusion: {in: Sdg::TYPES}

  translates :how_do_you_work, :what_makes_the_difference, :other_information, :previously_invested_description
end
