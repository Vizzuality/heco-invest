module Backoffice
  class InvestorsController < BaseController
    def index
      @investors = Investor.all.includes(account: [:owner])
      @pagy_object, @investors = pagy @investors
    end
  end
end
