FactoryBot.define do
  factory :project_developer do
    account

    categories { %w[forestry_and_agroforestry non_timber_forest_production] }
    impacts { %w[climate water] }
    project_developer_type { "TBD" }
    review_status { "approved" }
    mission { Faker::Lorem.paragraph(sentence_count: 4) }
    language { "en" }
  end
end
