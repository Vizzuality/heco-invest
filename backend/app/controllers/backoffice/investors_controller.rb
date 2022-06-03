module Backoffice
  class InvestorsController < BaseController
    def index
      @investors = Investor.all.includes(account: [:owner])
    end
  end
end
