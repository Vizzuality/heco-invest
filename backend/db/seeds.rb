require "factory_bot_rails"

if Rails.env.development?
  Account.delete_all
  Investor.delete_all

  50.times do
    investor_account = FactoryBot.create(:account)
    Investor.create!(
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
  end
end
