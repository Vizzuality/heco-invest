FactoryBot.define do
  factory :location_member do
    location
    member factory: :location
  end
end
