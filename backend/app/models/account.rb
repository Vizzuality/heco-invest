class Account < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged

  translates :about

  validates :name, presence: true, uniqueness: {case_sensitive: false}
end
