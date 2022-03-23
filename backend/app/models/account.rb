class Account < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged

  has_many :users

  has_one :investor
  has_one :project_developer

  translates :about

  validates :name, presence: true, uniqueness: {case_sensitive: false}
  validates :about, presence: true
  validates :website, url: true
  validates :linkedin, url: true
  validates :twitter, url: true
  validates :facebook, url: true
  validates :instagram, url: true
  validates :language, inclusion: {in: Language::TYPES}

  def slug_preview
    set_slug unless slug.present?
    slug
  end
end
