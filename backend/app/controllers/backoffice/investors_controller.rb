module Backoffice
  class InvestorsController < BaseController
    def index
      @q = Investor.ransack params[:q]
      @pagy_object, @investors = pagy @q.result.includes(account: [:owner])
    end
  end
end
