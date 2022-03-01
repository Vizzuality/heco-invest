FactoryBot.define do
  factory :investor do
    account

    categories { %w[forestry_and_agroforestry non_timber_forest_production] }
    sdgs { [1, 4, 5] }
    impacts { %w[climate water] }
    investor_type { "angel_investor" }
    instrument_types { %w[grant loan] }
    ticket_sizes { %w[validation scaling] }
    review_status { "approved" }

    previously_invested { true }
    previously_invested_description { Faker::Lorem.paragraph(sentence_count: 4) }
    how_do_you_work { Faker::Lorem.paragraph(sentence_count: 4) }
    what_makes_the_difference { Faker::Lorem.paragraph(sentence_count: 4) }
    other_information { Faker::Lorem.paragraph(sentence_count: 4) }

    language { "en" }
  end
end
