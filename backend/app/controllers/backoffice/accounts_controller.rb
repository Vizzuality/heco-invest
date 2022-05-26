module Backoffice
  class AccountsController < BaseController
    before_action :fetch_account, only: [:approve, :reject]

    def approve
      @account.approved!
      redirect_back(fallback_location: admin_root_path)
    end

    def reject
      @account.rejected!
      redirect_back(fallback_location: admin_root_path)
    end

    private

    def fetch_account
      @account = Account.find(params[:id])
    end
  end
end
