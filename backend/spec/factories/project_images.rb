FactoryBot.define do
  factory :project_image do
    project
    file { Rack::Test::UploadedFile.new(Rails.root.join("spec/fixtures/files/picture.jpg"), "image/jpeg") }
    is_cover { false }
  end
end
