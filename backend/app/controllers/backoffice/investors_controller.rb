module Backoffice
  class InvestorsController < BaseController
    def index
      @q = Investor.ransack params[:q]
      @pagy_object, @investors = pagy @q.result.includes(account: [:owner]), pagy_defaults
    end
  end
end
