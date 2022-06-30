module Backoffice
  class AdminsController < BaseController
    def index
      @q = Admin.ransack params[:q]
      @admins = @q.result
      @admins = @admins.search params.dig(:q, :filter_full_text) if params.dig(:q, :filter_full_text).present?

      respond_to do |format|
        format.html do
          @pagy_object, @admins = pagy @admins, pagy_defaults
        end
        format.csv do
          send_data Backoffice::CSV::AdminExporter.new(@admins).call,
            filename: "admins.csv",
            type: "text/csv; charset=utf-8"
        end
      end
    end
  end
end
