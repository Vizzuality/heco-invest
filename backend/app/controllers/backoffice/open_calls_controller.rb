module Backoffice
  class OpenCallsController < BaseController
    before_action :fetch_open_call, only: [:destroy, :verify, :unverify]

    def index
      @q = OpenCall.ransack params[:q]
      @open_calls = @q.result.includes(:country, :municipality, :department, investor: [:account])
      @open_calls = @open_calls.order(:created_at)

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

    def destroy
      OpenCalls::Destroy.new(@open_call).call
      redirect_to backoffice_open_calls_path, status: :see_other, notice: t("backoffice.messages.success_delete", model: t("backoffice.common.open_call"))
    end

    def verify
      @open_call.update! trusted: true

      redirect_back fallback_location: backoffice_open_calls_path
    end

    def unverify
      @open_call.update! trusted: false

      redirect_back fallback_location: backoffice_open_calls_path
    end

    private

    def fetch_open_call
      @open_call = OpenCall.find(params[:id])
    end
  end
end
