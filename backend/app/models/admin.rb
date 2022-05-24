class Admin < ApplicationRecord
  devise :database_authenticatable, :recoverable, :rememberable, :validatable

  validates :password,
    length: {minimum: 12, message: :password_length},
    allow_nil: true
  validate :password_complexity
  validates_presence_of :first_name, :last_name

  private

  def password_complexity
    return if password.blank?
    return if password.match?(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)./)

    errors.add :password, :password_complexity
  end
end
