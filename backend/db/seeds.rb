require "factory_bot_rails"

if Rails.env.development?
  Account.delete_all
  Investor.delete_all
  ProjectDeveloper.delete_all
  User.delete_all
  Location.delete_all
  Admin.delete_all

  Admin.create!(first_name: "Admin", last_name: "Example", password: "SuperSecret1234", email: "admin@example.com", ui_language: "en")

  Rake::Task["import_geojsons:colombia"].invoke

  15.times do
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
      mission: Faker::Lorem.paragraph(sentence_count: 4),
      prioritized_projects_description: Faker::Lorem.paragraph(sentence_count: 4),
      other_information: Faker::Lorem.paragraph(sentence_count: 4),
      language: investor_account.language
    )
    (0..5).to_a.sample.times do
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

    (0..5).to_a.sample.times do
      municipality = Location.where(location_type: :municipality).order("RANDOM()").first ||
        FactoryBot.create(:municipality, parent: FactoryBot.create(:department, parent: FactoryBot.create(:location)))
      FactoryBot.create(
        :project,
        status: :published,
        trusted: [true, false].sample,
        name: "#{Faker::Lorem.sentence} #{SecureRandom.hex(4)}",
        category: Category::TYPES.sample,
        project_developer: project_developer,
        municipality: municipality,
        department: municipality.parent,
        country: municipality.parent.parent
      )
    end
  end
end
