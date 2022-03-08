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
    sequence(:previously_invested_description) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    sequence(:how_do_you_work) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    sequence(:what_makes_the_difference) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    sequence(:other_information) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end

    language { "en" }
  end
end
