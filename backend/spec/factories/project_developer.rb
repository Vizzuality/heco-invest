FactoryBot.define do
  factory :project_developer do
    account

    categories { %w[forestry-and-agroforestry non-timber-forest-production] }
    impacts { %w[climate water] }
    project_developer_type { "ngo" }
    review_status { "approved" }
    sequence(:mission) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    language { "en" }
    entity_legal_registration_number { "564823570" }

    trait :with_locations do
      locations do
        [create(:location, location_type: "region"),
          create(:location, location_type: "region")]
      end
    end
  end
end
