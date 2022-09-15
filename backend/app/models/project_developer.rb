class ProjectDeveloper < ApplicationRecord
  include BelongsToAccount
  include Translatable
  include Searchable

  has_many :projects, dependent: :destroy
  has_many :open_call_applications, through: :projects
  has_many :favourite_project_developers, dependent: :destroy
  has_many :project_involvements, dependent: :destroy
  has_many :involved_projects, through: :project_involvements, source: :project, dependent: :destroy
  has_many :project_developer_priority_landscapes, dependent: :destroy
  has_many :priority_landscapes, through: :project_developer_priority_landscapes, source: :priority_landscape, dependent: :destroy

  validates :categories, array_inclusion: {in: Category::TYPES}, presence: true
  validates :impacts, array_inclusion: {in: Impact::TYPES}
  validates :project_developer_type, inclusion: {in: ProjectDeveloperType::TYPES, allow_blank: true}, presence: true
  validates :language, inclusion: {in: Language::TYPES, allow_blank: true}, presence: true

  validates_presence_of :mission, :entity_legal_registration_number

  translates :mission
end
