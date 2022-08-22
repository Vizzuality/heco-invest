module Backoffice
  class OpenCallsController < BaseController
    def index
      @q = OpenCall.ransack params[:q]
      @open_calls = @q.result.includes(:country, :municipality, :department, investor: [:account])

      respond_to do |format|
        format.html do
          @pagy_object, @open_calls = pagy @open_calls, pagy_defaults
        end
        format.csv do
          send_data Backoffice::CSV::OpenCallExporter.new(@open_calls).call,
            filename: "open_calls.csv",
            type: "text/csv; charset=utf-8"
        end
      end
    end
  end
end
