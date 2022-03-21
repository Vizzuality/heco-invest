FactoryBot.define do
  factory :location do
    location_type { "state" }

    sequence(:name) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Company.name
    end

    parent { nil }
  end
end
