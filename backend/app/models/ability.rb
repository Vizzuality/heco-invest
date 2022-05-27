class Ability
  include CanCan::Ability

  attr_accessor :user

  def initialize(user)
    @user = user

    default_rights
    user_rights if user.present?
  end

  private

  def default_rights
    can %i[index show], ProjectDeveloper, account: {review_status: :approved}
    can %i[index show], Investor, account: {review_status: :approved}
  end

  def user_rights
    can %i[show], ProjectDeveloper, account_id: user.account_id
    can %i[show], Investor, account_id: user.account_id
  end
end
