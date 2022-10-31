class Admin < ApplicationRecord
  include PgSearch::Model

  pg_search_scope :search, against: [:first_name, :last_name, :email], using: {tsearch: {prefix: true}}

  devise :database_authenticatable, :recoverable, :rememberable, :validatable, :trackable

  validates :password,
    length: {minimum: 12, message: :password_length},
    allow_nil: true
  validate :password_complexity
  validates_presence_of :first_name, :last_name
  validates :ui_language, inclusion: {in: Language::TYPES, allow_blank: true}, presence: true

  ransacker :full_name do
    Arel.sql("CONCAT_WS(' ', admins.first_name, admins.last_name)")
  end

  def locale
    ui_language
  end

  def full_name
    "#{first_name} #{last_name}"
  end

  private

  def password_complexity
    return if password.blank?
    return if password.match?(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)./)

    errors.add :password, :password_complexity
  end

  def send_devise_notification(notification, *args)
    args[-1] = (args.last || {}).merge fallback_language: I18n.locale
    devise_mailer.send(notification, self, *args).deliver_later
  end
end
