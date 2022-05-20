FactoryBot.define do
  factory :project_developer do
    account

    categories { %w[forestry-and-agroforestry non-timber-forest-production] }
    impacts { %w[climate water] }
    project_developer_type { "ngo" }
    mosaics { %w[amazon-heart amazonian-piedmont-massif] }
    language { "en" }
    entity_legal_registration_number { "564823570" }

    trait :with_involved_projects do
      transient do
        number_of_projects { 2 }
      end
      involved_projects { create_list(:project, number_of_projects) }
    end
  end
end
