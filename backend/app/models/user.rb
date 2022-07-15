class User < ApplicationRecord
  include PgSearch::Model

  EMAIL_CONFIRMATION_LIMIT_PERIOD = 10.minutes

  belongs_to :account, optional: true, counter_cache: true

  has_many :favourite_projects, dependent: :destroy
  has_many :projects, through: :favourite_projects
  has_many :favourite_project_developers, dependent: :destroy
  has_many :project_developers, through: :favourite_project_developers
  has_many :favourite_investors, dependent: :destroy
  has_many :investors, through: :favourite_investors
  has_one :owner_account, class_name: "Account", foreign_key: "owner_id", dependent: :restrict_with_error

  has_one_attached :avatar

  pg_search_scope :search, against: [:first_name, :last_name, :email]

  devise :invitable, :database_authenticatable, :confirmable, :registerable,
    :recoverable, :rememberable, :validatable, :trackable

  enum role: {light: 0, investor: 1, project_developer: 2}, _default: :light

  validates :password,
    length: {minimum: 12, message: :password_length},
    allow_nil: true
  validate :password_complexity
  validates :ui_language, inclusion: {in: Language::TYPES, allow_blank: true}, presence: true
  validates_presence_of :first_name, :last_name

  delegate :approved?, to: :account, allow_nil: true

  ransacker :full_name do
    Arel.sql("CONCAT_WS(' ', users.first_name, users.last_name)")
  end
  ransacker :owner_account_exists do
    Arel.sql("(SELECT EXISTS (SELECT 1 FROM accounts WHERE accounts.owner_id = users.id))")
  end

  def send_confirmation_instructions
    return if confirmation_sent_within_limited_period?

    self.last_confirmation_sent_at = Time.now.utc
    save(validate: false)
    super
  end

  def full_name
    "#{first_name} #{last_name}"
  end
  alias_method :to_s, :full_name

  private

  def confirmation_sent_within_limited_period?
    last_confirmation_sent_at && EMAIL_CONFIRMATION_LIMIT_PERIOD.ago.utc < last_confirmation_sent_at.utc
  end

  def password_complexity
    return if password.blank?
    return if password.match?(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)./)

    errors.add :password, :password_complexity
  end

  def block_from_invitation?
    false # invited users can still sign-in
  end
end
