class ProjectDeveloper < ApplicationRecord
  include BelongsToAccount
  include Reviewable

  has_many :projects, dependent: :destroy
  has_many :project_developer_locations, dependent: :destroy
  has_many :locations, through: :project_developer_locations

  validates :categories, array_inclusion: {in: Category::TYPES}, presence: true
  validates :impacts, array_inclusion: {in: Impact::TYPES}
  validates :project_developer_type, inclusion: {in: ProjectDeveloperType::TYPES}
  validates :language, inclusion: {in: Language::TYPES}

  validates_presence_of :mission, :entity_legal_registration_number

  translates :mission
end
