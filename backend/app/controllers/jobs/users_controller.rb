module Jobs
  class UsersController < BaseController
    def purge
      User.where(confirmed_at: nil, created_at: ..1.month.ago).destroy_all
    end
  end
end
