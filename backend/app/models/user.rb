class User < ApplicationRecord
  EMAIL_CONFIRMATION_LIMIT_PERIOD = 10.minutes

  belongs_to :account, optional: true

  devise :database_authenticatable, :confirmable, :registerable,
    :recoverable, :rememberable, :validatable

  enum role: {light: 0, investor: 1, project_developer: 2}, _default: :light

  validates :password,
    length: {minimum: 12, message: :password_length},
    allow_nil: true
  validate :password_complexity
  validates :ui_language, inclusion: {in: Language::TYPES}
  validates_presence_of :first_name, :last_name

  def send_confirmation_instructions
    return if confirmation_sent_within_limited_period?

    self.last_confirmation_sent_at = Time.now.utc
    save(validate: false)
    super
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
end
