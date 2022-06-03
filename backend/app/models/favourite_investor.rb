class FavouriteInvestor < ApplicationRecord
  belongs_to :user
  belongs_to :investor

  validates_uniqueness_of :investor, scope: :user_id
end
