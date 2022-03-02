class Account < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged

  translates :about

  validates :name, presence: true, uniqueness: {case_sensitive: false}
  validates :website, url: true
  validates :linkedin, url: true
  validates :twitter, url: true
  validates :facebook, url: true
  validates :instagram, url: true
end
