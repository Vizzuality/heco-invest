FactoryBot.define do
  factory :project do
    project_developer

    sequence(:name) do |n|
      "Project #{n}"
    end

    development_stage { "scaling-up" }
    categories { %w[forestry-and-agroforestry non-timber-forest-production] }
    sdgs { [1, 4, 5] }
    target_groups { %w[urban-populations indigenous-peoples] }
    impact_areas { %w[pollutants-reduction carbon-emission-reduction] }

    trusted { false }

    estimated_duration_in_months { 13 }

    country
    municipality
    department

    sequence(:description) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    sequence(:problem) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    sequence(:solution) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    sequence(:sustainability) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    sequence(:replicability) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    sequence(:progress_impact_tracking) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    sequence(:expected_impact) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end

    looking_for_funding { true }
    instrument_types { %w[grant loan] }
    ticket_size { "scaling" }
    sequence(:funding_plan) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end

    received_funding { true }
    received_funding_amount_usd { 3000 }
    sequence(:received_funding_investor) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Company.name
    end

    language { "en" }
  end
end
