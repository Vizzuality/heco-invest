class FavouriteProjectDeveloper < ApplicationRecord
  belongs_to :user
  belongs_to :project_developer
end
