class Account < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged

  belongs_to :owner, class_name: "User"

  has_many :users

  has_one :investor
  has_one :project_developer

  has_one_attached :picture

  translates :about

  validates :name, presence: true, uniqueness: {case_sensitive: false}
  validates :about, presence: true
  validates :website, url: true
  validates :linkedin, url: true
  validates :twitter, url: true
  validates :facebook, url: true
  validates :instagram, url: true
  validates :language, inclusion: {in: Language::TYPES}
  validates :picture, attached: true, content_type: /\Aimage\/.*\z/
  validates :contact_email, presence: true

  def slug_preview
    set_slug unless slug.present?
    slug
  end
end
