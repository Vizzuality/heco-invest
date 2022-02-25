if Rails.env.development?
  Account.delete_all
  Investor.delete_all

  10.times do
    investor_account = Account.create!(
      name: Faker::Company.name,
      about: Faker::Lorem.paragraph(sentence_count: 4),
      instagram: Faker::Internet.url(host: "instagram.com"),
      facebook: Faker::Internet.url(host: "facebook.com"),
      linkedin: Faker::Internet.url(host: "linkedin.com")
    )
    Investor.create!(
      account: investor_account,
      previously_invested: true,
      previously_invested_description: Faker::Lorem.paragraph(sentence_count: 4),
      how_do_you_work: Faker::Lorem.paragraph(sentence_count: 4),
      what_makes_the_difference: Faker::Lorem.paragraph(sentence_count: 4),
      other_information: Faker::Lorem.paragraph(sentence_count: 4)
    )
  end
end
