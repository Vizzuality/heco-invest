class ProjectDeveloper < ApplicationRecord
  include BelongsToAccount
  include Reviewable

  has_many :projects, dependent: :destroy

  validates :categories, array_inclusion: {in: Category::TYPES}, presence: true
  validates :impacts, array_inclusion: {in: Impact::TYPES}
  validates :project_developer_type, inclusion: {in: ProjectDeveloperType::TYPES}
  validates :language, inclusion: {in: (I18n.available_locales - [:zu]).map(&:to_s)}

  validates_presence_of :mission

  translates :mission
end
