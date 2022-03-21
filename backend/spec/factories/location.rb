FactoryBot.define do
  factory :location do
    location_type { "country" }

    sequence(:name) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Company.name
    end

    parent { nil }

    trait :with_municipalities do
      transient do
        municipalities_count { 2 }
      end

      after(:create) do |location, evaluator|
        department = create :location, parent: location, location_type: "department"
        evaluator.municipalities_count.times do
          create :location, :with_region, parent: department, location_type: "municipality"
        end
      end
    end

    trait :with_region do
      after(:create) do |location|
        region = create :location, location_type: "region"
        create :location_member, location: location, member: region
      end
    end
  end
end
