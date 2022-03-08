FactoryBot.define do
  factory :project do
    project_developer

    sequence(:name) do |n|
      "Project #{n}"
    end

    categories { %w[forestry_and_agroforestry non_timber_forest_production] }
    sdgs { [1, 4, 5] }
    instrument_types { %w[grant loan] }
    ticket_size { "scaling" }

    trusted { false }

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
    sequence(:business_model) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    sequence(:roi) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    sequence(:sustainability) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    sequence(:other_information) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    sequence(:impact_description) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    income_in_last_3_years { "100K - 500K" }

    number_of_employees { 10 }
    number_of_employees_women { 6 }
    number_of_employees_young { 2 }
    number_of_employees_indigenous { 3 }
    number_of_employees_migrants { 2 }

    received_funding { true }
    sequence(:received_funding_description) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end

    language { "en" }
  end
end
