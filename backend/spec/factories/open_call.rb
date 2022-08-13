FactoryBot.define do
  factory :open_call do
    investor

    sequence(:name) do |n|
      "Open call #{n}"
    end
    status { "launched" }

    picture { Rack::Test::UploadedFile.new(Rails.root.join("spec/fixtures/files/picture.jpg"), "image/jpeg") }

    country
    municipality
    department

    sdgs { [1, 4, 5] }
    instrument_types { ["loan"] }

    trusted { false }

    maximum_funding_per_project { 100_000 }

    sequence(:description) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    sequence(:funding_priorities) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    sequence(:funding_exclusions) do |n|
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
