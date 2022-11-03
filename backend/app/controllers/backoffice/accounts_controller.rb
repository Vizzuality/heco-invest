module Backoffice
  class AccountsController < BaseController
    before_action :fetch_account, only: [:approve, :reject]

    def approve
      if @account.update(review_status: :approved)
        UserMailer.approved(@account.owner).deliver_later
        redirect_back(fallback_location: admin_root_path)
      else
        redirect_back(fallback_location: admin_root_path, alert: @account.errors.first.full_message)
      end
    end

    def reject
      @account.rejected!
      UserMailer.rejected(@account.owner).deliver_later
      redirect_back(fallback_location: admin_root_path)
    end

    private

    def fetch_account
      @account = Account.find(params[:id])
    end
  end
end
