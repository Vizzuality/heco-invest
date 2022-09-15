FactoryBot.define do
  factory :project_developer do
    account

    categories { %w[forestry-and-agroforestry non-timber-forest-production] }
    impacts { %w[climate water] }
    project_developer_type { "ngo" }
    priority_landscapes { create_list(:priority_landscape, 2) }
    sequence(:mission) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    entity_legal_registration_number { "564823570" }

    trait :with_involved_projects do
      transient do
        number_of_projects { 2 }
      end
      involved_projects { create_list(:project, number_of_projects) }
    end
  end
end
