module Backoffice
  class InvestorsController < BaseController
    def index
      @q = Investor.ransack params[:q]
      @investors = API::Filterer.new(@q.result, {full_text: params.dig(:q, :filter_full_text)}).call
      @investors = @investors.includes(account: [:owner])

      respond_to do |format|
        format.html do
          @pagy_object, @investors = pagy @investors, pagy_defaults
        end
        format.csv do
          send_data Backoffice::Csv::InvestorExporter.new(@investors).call,
            filename: "investors.csv",
            type: "text/csv; charset=utf-8"
        end
      end
    end
  end
end
