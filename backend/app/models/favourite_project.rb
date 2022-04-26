class FavouriteProject < ApplicationRecord
  belongs_to :user
  belongs_to :project

  validates_uniqueness_of :project, scope: :user_id
end
