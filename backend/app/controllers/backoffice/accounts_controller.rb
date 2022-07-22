module Backoffice
  class AccountsController < BaseController
    before_action :fetch_account, only: [:approve, :reject]

    def approve
      I18n.with_locale(@account.language) { @account.approved! }
      UserMailer.approved(@account.owner).deliver_later
      redirect_back(fallback_location: admin_root_path)
    end

    def reject
      I18n.with_locale(@account.language) { @account.rejected! }
      UserMailer.rejected(@account.owner).deliver_later
      redirect_back(fallback_location: admin_root_path)
    end

    private

    def fetch_account
      @account = Account.find(params[:id])
    end
  end
end
