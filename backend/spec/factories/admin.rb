FactoryBot.define do
  factory :admin do
    sequence(:first_name) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Name.first_name
    end
    sequence(:last_name) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Name.last_name
    end
    sequence(:email) { |n| "admin#{n}@example.com" }
    password { "SuperSecret1234" }
    ui_language { "en" }
  end
end
