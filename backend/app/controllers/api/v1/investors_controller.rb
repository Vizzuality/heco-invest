module API
  module V1
    class InvestorsController < BaseController
      def index
        render json: InvestorSerializer.new(Investor.all).serializable_hash
      end

      def show
        investor = fetch_investor

        render json: InvestorSerializer.new(investor).serializable_hash
      end

      private

      def fetch_investor
        return Investor.find(params[:id]) if fetch_by_uuid?

        account = Account.friendly.find(params[:id])
        Investor.find_by!(account_id: account.id)
      end

      def fetch_by_uuid?
        params[:id]&.length == SecureRandom.uuid.length
      end
    end
  end
end
