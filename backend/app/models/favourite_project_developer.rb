class FavouriteProjectDeveloper < ApplicationRecord
  belongs_to :user
  belongs_to :project_developer

  validates_uniqueness_of :project_developer, scope: :user_id
end
