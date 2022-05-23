class Investor < ApplicationRecord
  include BelongsToAccount
  include Translatable
  include Searchable

  has_many :open_calls, dependent: :destroy

  validates :categories, array_inclusion: {in: Category::TYPES}
  validates :instrument_types, array_inclusion: {in: InstrumentType::TYPES}, presence: true
  validates :ticket_sizes, array_inclusion: {in: TicketSize::TYPES}, presence: true
  validates :impacts, array_inclusion: {in: Impact::TYPES}, presence: true
  validates :sdgs, array_inclusion: {in: Sdg::TYPES}
  validates :investor_type, inclusion: {in: InvestorType::TYPES}
  validates :language, inclusion: {in: Language::TYPES}
  validates :previously_invested, inclusion: {in: [true, false]}

  validates_presence_of :mission, :other_information

  translates :mission, :prioritized_projects_description, :other_information
end
