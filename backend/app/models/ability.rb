class Ability
  include CanCan::Ability

  attr_accessor :user, :context

  def initialize(user, context: nil)
    @user = user
    @context = context

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
    can %i[index show], ProjectDeveloper, account: {review_status: Account.review_statuses[:approved]}
    can %i[index show], Investor, account: {review_status: Account.review_statuses[:approved]}
    can %i[index show], Project,
      project_developer: {account: {review_status: Account.review_statuses[:approved]}},
      status: Project.statuses[:published]
    can %i[index show], OpenCall,
      investor: {account: {review_status: Account.review_statuses[:approved]}},
      status: [OpenCall.statuses[:launched], OpenCall.statuses[:closed]]
  end

  def user_rights
    can %i[show edit update], User, id: user.id
    can %i[destroy], User.left_joins(:owner_account).where(id: user.id, owner_account: {id: nil})
    can %i[index show], User, account_id: user.account_id

    can %i[create update], Investor, account_id: user.account_id
    can %i[create update], ProjectDeveloper, account_id: user.account_id

    # users can always see their own data
    can %i[show], ProjectDeveloper, account_id: user.account_id
    can %i[show], Investor, account_id: user.account_id
    can %i[show], Project, project_developer: {account_id: user.account_id}
    can %i[show], OpenCall, investor: {account_id: user.account_id}

    if context == :accounts
      # user can list even draft data in accounts controller context
      can %i[index], Project, project_developer: {account_id: user.account_id}
      can %i[index], OpenCall, investor: {account_id: user.account_id}
    end
  end

  def owner_rights
    can %i[invite], User, account_id: nil
    can %i[index show destroy], User, invited_by_id: user.id, invited_by_type: "User", account_id: nil
    can %i[destroy], User.where(account_id: user.account_id).where.not(id: user.id)
    can :transfer_ownership, User, account_id: user.account.id

    can :destroy, Project, {project_developer: {account: {owner_id: user.id}}}
  end

  def approved_user_rights
    can :manage, FavouriteProject, user_id: user.id
    can :manage, FavouriteProjectDeveloper, user_id: user.id
    can :manage, FavouriteInvestor, user_id: user.id
    can :manage, FavouriteOpenCall, user_id: user.id

    can %i[favourites], User, id: user.id
    can %i[favourites], Project, favourite_projects: {user_id: user.id}
    can %i[favourites], ProjectDeveloper, favourite_project_developers: {user_id: user.id}
    can %i[favourites], Investor, favourite_investors: {user_id: user.id}
    can %i[favourites], OpenCall, favourite_open_calls: {user_id: user.id}

    if user.account.investor_id.present?
      can %i[create update], OpenCall, investor: {account_id: user.account_id}
    else
      can %i[create update], Project, project_developer: {account_id: user.account_id}
    end
  end
end
