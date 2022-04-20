class ProjectImage < ApplicationRecord
  belongs_to :project

  has_one_attached :file

  validates :file, attached: true, content_type: /\Aimage\/.*\z/, size: {less_than: 5.megabytes}
  validates :is_cover, inclusion: {in: [true, false]}
end
