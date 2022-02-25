module API
  module V1
    class InvestorsController < BaseController
      def index
        render json: InvestorSerializer.new(Investor.all).serializable_hash
      end

      def show
        investor = Investor.find(params[:id])

        render json: InvestorSerializer.new(investor).serializable_hash
      end
    end
  end
end
