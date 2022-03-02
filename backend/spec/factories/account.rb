FactoryBot.define do
  factory :account do
    sequence(:name) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Company.name
    end
    about { Faker::Lorem.paragraph(sentence_count: 4) }
    instagram { "https://instagram.com/#{slug_preview}" }
    twitter { "https://twitter.com/#{slug_preview}" }
    linkedin { "https://linkedin.com/#{slug_preview}" }
    facebook { "https://facebook.com/#{slug_preview}" }
    website { "https://#{slug_preview}.com" }
    language { "en" }
  end
end
