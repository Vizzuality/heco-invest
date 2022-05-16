FactoryBot.define do
  factory :location, aliases: [:country] do
    location_type { "country" }

    sequence(:name) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Address.country
    end

    parent { nil }

    trait :with_municipalities do
      transient do
        municipalities_count { 2 }
      end

      after(:create) do |location, evaluator|
        department = create :location, parent: location, location_type: "department"
        evaluator.municipalities_count.times do
          create :location, parent: department, location_type: "municipality"
        end
      end
    end

    trait :with_geometry do
      transient do
        geometry { RGeo::GeoJSON.decode({type: "Polygon", coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1]]]}.to_json) }
      end

      after(:create) do |location, evaluator|
        create :location_geometry, location: location, geometry: evaluator.geometry
      end
    end

    factory :department do
      location_type { "department" }

      sequence(:name) do |n|
        Faker::Config.random = Random.new(n)
        Faker::Address.state
      end
    end

    factory :municipality do
      location_type { "municipality" }

      sequence(:name) do |n|
        "Municipality #{n}"
      end
    end
  end
end
