class User < ApplicationRecord
  include PgSearch::Model

  EMAIL_CONFIRMATION_LIMIT_PERIOD = 30.seconds

  belongs_to :account, optional: true, counter_cache: true

  has_many :favourite_projects, dependent: :destroy
  has_many :projects, through: :favourite_projects
  has_many :favourite_project_developers, dependent: :destroy
  has_many :project_developers, through: :favourite_project_developers
  has_many :favourite_investors, dependent: :destroy
  has_many :investors, through: :favourite_investors
  has_many :favourite_open_calls, dependent: :destroy
  has_many :open_calls, through: :favourite_open_calls
  has_one :owner_account, class_name: "Account", foreign_key: "owner_id"

  has_one_attached :avatar

  pg_search_scope :search, against: [:first_name, :last_name, :email], using: {tsearch: {prefix: true}}

  devise :two_factor_authenticatable, :invitable, :database_authenticatable, :confirmable, :registerable,
    :recoverable, :rememberable, :validatable, :trackable

  enum role: {light: 0, investor: 1, project_developer: 2}, _default: :light

  validates :password,
    length: {minimum: 12, message: :password_length},
    allow_nil: true
  validate :password_complexity
  validates :ui_language, inclusion: {in: Language::TYPES, allow_blank: true}, presence: true
  validates_presence_of :first_name, :last_name

  delegate :approved?, to: :account, allow_nil: true
  delegate :language, to: :account, allow_nil: true, prefix: true

  ransacker :full_name do
    Arel.sql("CONCAT_WS(' ', users.first_name, users.last_name)")
  end
  ransacker :owner_account_exists do
    Arel.sql("(SELECT EXISTS (SELECT 1 FROM accounts WHERE accounts.owner_id = users.id))")
  end

  def locale
    account_language.presence || ui_language
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

  def invalidate_session!
    update! token: SecureRandom.hex, remember_created_at: nil
  end

  def authenticatable_salt
    "#{super}#{token}"
  end

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

  def send_devise_notification(notification, *args)
    args[-1] = (args.last || {}).merge fallback_language: I18n.locale
    devise_mailer.send(notification, self, *args).deliver_later
  end
end
