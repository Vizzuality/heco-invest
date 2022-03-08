FactoryBot.define do
  factory :open_call do
    investor

    sequence(:name) do |n|
      "Open call #{n}"
    end

    sdgs { [1, 4, 5] }
    instrument_type { "loan" }
    ticket_size { "scaling" }

    trusted { false }

    sequence(:description) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    sequence(:money_distribution) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    sequence(:impact_description) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end

    language { "en" }

    closing_at { 10.months.from_now }
  end
end
