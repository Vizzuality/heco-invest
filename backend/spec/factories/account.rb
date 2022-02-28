FactoryBot.define do
  factory :account do
    sequence(:name) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Company.name
    end
    about { Faker::Lorem.paragraph(sentence_count: 4) }
    instagram { "https://instagram.com/#{slug}" }
    twitter { "https://twitter.com/#{slug}" }
    linkedin { "https://linkedin.com/#{slug}" }
    facebook { "https://facebook.com/#{slug}" }
    website { "https://#{slug}.com" }
  end
end
