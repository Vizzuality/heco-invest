class ProjectDeveloper < ApplicationRecord
  include BelongsToAccount
  include Reviewable
  include Searchable

  has_many :projects, dependent: :destroy
  has_many :favourite_project_developers, dependent: :destroy

  has_and_belongs_to_many :involved_projects, join_table: "project_involvements", class_name: "Project"

  validates :categories, array_inclusion: {in: Category::TYPES}, presence: true
  validates :impacts, array_inclusion: {in: Impact::TYPES}
  validates :project_developer_type, inclusion: {in: ProjectDeveloperType::TYPES}
  validates :mosaics, array_inclusion: {in: Mosaic::TYPES}
  validates :language, inclusion: {in: Language::TYPES}

  validates_presence_of :mission, :entity_legal_registration_number

  translates :mission
end
