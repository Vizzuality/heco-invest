module Backoffice
  class InvestorsController < BaseController
    def index
      @q = Investor.ransack params[:q]
      @investors = API::Filterer.new(@q.result, {full_text: params.dig(:q, :filter_full_text)}).call
      @pagy_object, @investors = pagy @investors.includes(account: [:owner]), pagy_defaults
    end
  end
end
