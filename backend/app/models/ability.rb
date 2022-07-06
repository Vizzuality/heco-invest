class Ability
  include CanCan::Ability

  attr_accessor :user

  def initialize(user)
    @user = user

    default_rights
    return if user.blank?

    user_rights
    owner_rights if user.owner_account&.approved?
    approved_user_rights if user.approved?
  end

  private

  def default_rights
    can :create, User

    # only data from approved users are visible
    can %i[index show], ProjectDeveloper, account: {review_status: :approved}
    can %i[index show], Investor, account: {review_status: :approved}
    can %i[index show], Project, project_developer: {account: {review_status: :approved}}
    can %i[index show], OpenCall, investor: {account: {review_status: :approved}}
  end

  def user_rights
    can %i[show edit update], User, id: user.id
    can %i[destroy], User do |u|
      u.id == user.id && user.owner_account.nil?
    end
    can %i[index show], User, account_id: user.account_id

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

  def owner_rights
    can %i[invite], User, account_id: nil
    can %i[index show], User, invited_by_id: user.id, invited_by_type: "User"
    can %i[destroy], User do |u|
      u.account_id == user.account_id && u.id != user.id
    end
  end

  def approved_user_rights
    can :manage, FavouriteProject, user_id: user.id
    can :manage, FavouriteProjectDeveloper, user_id: user.id
    can :manage, FavouriteInvestor, user_id: user.id
  end
end
