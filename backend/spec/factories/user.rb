FactoryBot.define do
  factory :user do
    sequence(:first_name) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Name.first_name
    end
    sequence(:last_name) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Name.last_name
    end
    email { Faker::Internet.safe_email(name: "#{first_name} #{last_name}") }
    password { "SuperSecret1234" }
    role { "light" }
    ui_language { "en" }
    confirmed_at { 1.day.ago }
    otp_required_for_login { false }

    trait :unconfirmed do
      confirmed_at { nil }
    end

    after(:build) do |u|
      u.skip_confirmation_notification!
    end

    factory :user_project_developer do
      role { "project_developer" }

      account factory: :account_project_developer
    end

    factory :user_investor do
      role { "investor" }

      account factory: :account_investor
    end

    trait :project_developer do
      role { "project_developer" }
    end

    trait :investor do
      role { "investor" }
    end

    trait :with_avatar do
      avatar { Rack::Test::UploadedFile.new(Rails.root.join("spec/fixtures/files/picture.jpg"), "image/jpeg") }
    end
  end
end
