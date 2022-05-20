FactoryBot.define do
  factory :account do
    owner factory: :user
    sequence(:name) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Company.name
    end
    sequence(:about) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    sequence(:mission) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    picture { Rack::Test::UploadedFile.new(Rails.root.join("spec/fixtures/files/picture.jpg"), "image/jpeg") }
    instagram { "https://instagram.com/#{slug_preview}" }
    twitter { "https://twitter.com/#{slug_preview}" }
    linkedin { "https://linkedin.com/#{slug_preview}" }
    facebook { "https://facebook.com/#{slug_preview}" }
    website { "https://#{slug_preview}.com" }
    language { "en" }
    contact_email { "contact@example.com" }
    contact_phone { "+57-1-xxx-xx-xx" }
    review_status { "approved" }

    factory :account_project_developer do
      project_developer
    end
  end
end
