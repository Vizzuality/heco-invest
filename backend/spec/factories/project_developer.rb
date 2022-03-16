FactoryBot.define do
  factory :project_developer do
    account

    categories { %w[forestry-and-agroforestry non-timber-forest-production] }
    impacts { %w[climate water] }
    project_developer_type { "TBD" }
    review_status { "approved" }
    sequence(:mission) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    language { "en" }
  end
end
