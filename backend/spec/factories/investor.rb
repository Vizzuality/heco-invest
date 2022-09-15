FactoryBot.define do
  factory :investor do
    account

    categories { %w[forestry-and-agroforestry non-timber-forest-production] }
    sdgs { [1, 4, 5] }
    impacts { %w[climate water] }
    investor_type { "angel-investor" }
    instrument_types { %w[grant loan] }
    ticket_sizes { %w[validation scaling] }

    previously_invested { true }
    sequence(:mission) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    sequence(:prioritized_projects_description) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    sequence(:other_information) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
  end
end
