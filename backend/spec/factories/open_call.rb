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

    description { Faker::Lorem.paragraph(sentence_count: 4) }
    money_distribution { Faker::Lorem.paragraph(sentence_count: 4) }
    impact_description { Faker::Lorem.paragraph(sentence_count: 4) }

    language { "en" }

    closing_at { 10.months.from_now }
  end
end
