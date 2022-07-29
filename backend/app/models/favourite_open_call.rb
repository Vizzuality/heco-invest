class FavouriteOpenCall < ApplicationRecord
  belongs_to :user
  belongs_to :open_call

  validates_uniqueness_of :open_call, scope: :user_id
end
