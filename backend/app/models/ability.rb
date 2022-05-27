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
    # only data from approved users are visible
    can %i[index show], ProjectDeveloper, account: {review_status: :approved}
    can %i[index show], Investor, account: {review_status: :approved}
    can %i[index show], Project, project_developer: {account: {review_status: :approved}}
    can %i[index show], OpenCall, investor: {account: {review_status: :approved}}
  end

  def user_rights
    can %i[create update], Investor, account_id: user.account_id
    can %i[create update], ProjectDeveloper, account_id: user.account_id
    can %i[create update], Project, project_developer: {account_id: user.account_id}
    can %i[create update], OpenCall, investor: {account_id: user.account_id}

    # users can always see their own data
    can %i[show], ProjectDeveloper, account_id: user.account_id
    can %i[show], Investor, account_id: user.account_id
    can %i[show], Project, project_developer: {account_id: user.account_id}
    can %i[show], OpenCall, investor: {account_id: user.account_id}
  end
end
