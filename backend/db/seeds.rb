require "factory_bot_rails"

if Rails.env.development?
  Account.delete_all
  Investor.delete_all
  ProjectDeveloper.delete_all
  User.delete_all

  5.times do
    investor_account = FactoryBot.create(:account)
    investor_account.owner.update!(role: "investor")
    investor = Investor.create!(
      account: investor_account,
      categories: Category::TYPES.shuffle.take((1..2).to_a.sample),
      sdgs: Sdg::TYPES.shuffle.take((1..10).to_a.sample),
      investor_type: InvestorType::TYPES.sample,
      instrument_types: InstrumentType::TYPES.shuffle.take((1..5).to_a.sample),
      ticket_sizes: TicketSize::TYPES.shuffle.take((1..2).to_a.sample),
      impacts: Impact::TYPES.shuffle.take((1..2).to_a.sample),
      previously_invested: true,
      previously_invested_description: Faker::Lorem.paragraph(sentence_count: 4),
      how_do_you_work: Faker::Lorem.paragraph(sentence_count: 4),
      what_makes_the_difference: Faker::Lorem.paragraph(sentence_count: 4),
      other_information: Faker::Lorem.paragraph(sentence_count: 4),
      language: investor_account.language
    )
    (0..3).to_a.sample.times do
      FactoryBot.create(:open_call, investor: investor)
    end

    project_developer_account = FactoryBot.create(:account)
    project_developer_account.owner.update!(role: "project_developer")
    project_developer = ProjectDeveloper.create!(
      account: project_developer_account,
      project_developer_type: ProjectDeveloperType::TYPES.sample,
      categories: Category::TYPES.shuffle.take((1..2).to_a.sample),
      impacts: Impact::TYPES.shuffle.take((1..2).to_a.sample),
      mission: Faker::Lorem.paragraph(sentence_count: 4),
      language: investor_account.language,
      entity_legal_registration_number: "564823570"
    )

    (0..3).to_a.sample.times do
      FactoryBot.create(:project, project_developer: project_developer)
    end
  end

  Importers::Locations.new("Colombia",
    departments_file_path: Rails.root.join("db/seeds/files/colombia_departments.csv"),
    municipalities_file_path: Rails.root.join("db/seeds/files/colombia_municipalities.csv"),
    regions_file_path: Rails.root.join("db/seeds/files/colombia_regions.csv")).call
end
