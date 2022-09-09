FactoryBot.define do
  factory :open_call_application do
    open_call
    project

    sequence(:message) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
  end
end
