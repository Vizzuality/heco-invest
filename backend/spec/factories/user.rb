FactoryBot.define do
  factory :user do
    sequence(:first_name) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Name.first_name
    end
    sequence(:last_name) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Name.last_name
    end
    email { Faker::Internet.safe_email(name: "#{first_name} #{last_name}") }
    password { "SuperSecret1234" }
    ui_language { "en" }
    confirmed_at { 1.day.ago }
  end
end
