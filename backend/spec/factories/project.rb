FactoryBot.define do
  factory :project do
    project_developer

    sequence(:name) do |n|
      "Project #{n}"
    end

    status { "published" }
    development_stage { "scaling-up" }
    category { "forestry-and-agroforestry" }
    sdgs { [1, 4, 5] }
    target_groups { %w[urban-populations indigenous-peoples] }
    impact_areas { %w[pollutants-reduction carbon-emission-reduction] }

    verified { false }

    estimated_duration_in_months { 13 }

    country
    municipality
    department

    sequence(:description) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    sequence(:problem) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    sequence(:solution) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    sequence(:sustainability) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    sequence(:replicability) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    sequence(:progress_impact_tracking) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    sequence(:expected_impact) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end

    sequence(:positive_financial_returns) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 2)
    end
    sequence(:last_year_sales_revenue) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 1)
    end

    climate_change_risks_identified { true }

    sequence(:limate_change_risks_details) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 2)
    end

    looking_for_funding { true }
    instrument_types { %w[grant loan] }
    ticket_size { "scaling" }
    sequence(:funding_plan) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end

    received_funding { true }
    received_funding_amount_usd { 3000 }
    sequence(:received_funding_investor) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Company.name
    end

    language { "en" }
    geometry { {type: "Polygon", coordinates: [[[-7.256596802202454, 39.42149705239956], [-5.510236906689473, 40.02677860935444], [-4.408874148363334, 39.419930008870296], [-5.205992932301829, 38.67169482742881], [-6.402685625872827, 38.39721372248553], [-7.059852379049463, 38.94985978831832], [-7.256596802202454, 39.42149705239956]]]} }

    trait :with_involved_project_developers do
      involved_project_developers { create_list(:project_developer, 2) }
      involved_project_developer_not_listed { true }
    end

    trait :with_project_images do
      project_images { [build(:project_image, project: nil), build(:project_image, project: nil)] }
    end

    trait :draft do
      status { "draft" }
    end

    trait :published do
      status { "published" }
    end

    trait :with_impacts do
      impact_calculated { true }
      project_biodiversity_impact { 0.1 }
      project_climate_impact { 0.1 }
      project_water_impact { 0.1 }
      project_community_impact { 0.1 }
      project_total_impact { 0.1 }
      municipality_biodiversity_impact { 0.1 }
      municipality_climate_impact { 0.1 }
      municipality_water_impact { 0.1 }
      municipality_community_impact { 0.1 }
      municipality_total_impact { 0.1 }
      hydrobasin_biodiversity_impact { 0.1 }
      hydrobasin_climate_impact { 0.1 }
      hydrobasin_water_impact { 0.1 }
      hydrobasin_community_impact { 0.1 }
      hydrobasin_total_impact { 0.1 }
      priority_landscape_biodiversity_impact { 0.1 }
      priority_landscape_climate_impact { 0.1 }
      priority_landscape_water_impact { 0.1 }
      priority_landscape_community_impact { 0.1 }
      priority_landscape_total_impact { 0.1 }
    end

    trait :with_demands do
      project_demands_calculated { true }
      municipality_demands_calculated { true }
      hydrobasin_demands_calculated { true }
      priority_landscape_demands_calculated { true }
      project_biodiversity_demand { 0.1 }
      project_climate_demand { 0.1 }
      project_water_demand { 0.1 }
      project_community_demand { 0.1 }
      municipality_biodiversity_demand { 0.1 }
      municipality_climate_demand { 0.1 }
      municipality_water_demand { 0.1 }
      municipality_community_demand { 0.1 }
      hydrobasin_biodiversity_demand { 0.1 }
      hydrobasin_climate_demand { 0.1 }
      hydrobasin_water_demand { 0.1 }
      hydrobasin_community_demand { 0.1 }
      priority_landscape_biodiversity_demand { 0.1 }
      priority_landscape_climate_demand { 0.1 }
      priority_landscape_water_demand { 0.1 }
      priority_landscape_community_demand { 0.1 }
    end
  end
end
