module Backoffice
  class InvestorsController < BaseController
    def index
      @q = Investor.ransack params[:q]
      @investors = API::Filterer.new(@q.result, filter_params.to_h).call
      @pagy_object, @investors = pagy @investors.includes(account: [:owner]), pagy_defaults
    end

    private

    def filter_params
      params.fetch(:filter, {}).permit :full_text
    end
  end
end
