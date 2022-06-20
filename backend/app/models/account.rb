class Account < ApplicationRecord
  extend FriendlyId
  include Translatable
  include Searchable

  friendly_id :name, use: :slugged

  belongs_to :owner, class_name: "User"

  has_many :users

  has_one :investor
  has_one :project_developer

  has_one_attached :picture

  translates :about

  enum review_status: ReviewStatus::TYPES_WITH_CODE, _default: :unapproved
  ransacker :review_status, formatter: proc { |v| review_statuses[v] }

  validates :name, presence: true, uniqueness: {case_sensitive: false}
  validates :about, presence: true
  validates :website, url: true
  validates :linkedin, url: true
  validates :twitter, url: true
  validates :facebook, url: true
  validates :instagram, url: true
  validates :language, inclusion: {in: Language::TYPES, allow_blank: true}, presence: true
  validates :picture, attached: true, content_type: /\Aimage\/.*\z/
  validates :contact_email, presence: true
  validates :contact_email, format: {with: Devise.email_regexp}, unless: -> { contact_email.blank? }

  before_update :set_reviewed_at, if: :review_status_changed?

  def slug_preview
    set_slug unless slug.present?
    slug
  end

  private

  def set_reviewed_at
    self.reviewed_at = Time.now
  end
end
