class User < ApplicationRecord
  belongs_to :account, optional: true

  devise :database_authenticatable, :confirmable, :registerable,
    :recoverable, :rememberable, :validatable

  enum role: {light: 0, investor: 1, project_developer: 2}, _default: :light

  validates :password,
    length: {minimum: 12, message: "must be at least 12 characters long"},
    allow_nil: true
  validate :password_complexity
  validates :ui_language, inclusion: {in: Language::TYPES}
  validates_presence_of :first_name, :last_name

  def password_complexity
    return if password.blank?
    return if password.match?(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)./)

    errors.add :password, "must include at least one lowercase letter, one uppercase letter, and one digit"
  end

  def confirmation_required?
    false
  end
end
