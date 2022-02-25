class Investor < ApplicationRecord
  belongs_to :account

  translates :how_do_you_work, :what_makes_the_difference, :other_information, :previously_invested_description
end
