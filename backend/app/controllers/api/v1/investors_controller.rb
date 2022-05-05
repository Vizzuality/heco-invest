module API
  module V1
    class InvestorsController < BaseController
      include API::Pagination

      def index
        investors = Investor.approved.includes(account: [:owner, {picture_attachment: :blob}])
        investors = API::Filterer.new(investors, filter_params.to_h).call
        pagy_object, investors = pagy(investors, page: current_page, items: per_page)
        render json: InvestorSerializer.new(
          investors,
          include: included_relationships,
          fields: sparse_fieldset,
          links: pagination_links(:api_v1_investors_path, pagy_object),
          meta: pagination_meta(pagy_object),
          params: {current_user: current_user}
        ).serializable_hash
      end

      def show
        investor = fetch_investor

        render json: InvestorSerializer.new(
          investor,
          fields: sparse_fieldset,
          params: {current_user: current_user}
        ).serializable_hash
      end

      private

      def fetch_investor
        return Investor.find(params[:id]) if fetching_by_uuid?

        account = Account.friendly.find(params[:id])
        Investor.find_by!(account_id: account.id)
      end

      def filter_params
        params.fetch(:filter, {}).permit :category, :impact, :sdg, :instrument_type, :ticket_size
      end
    end
  end
end
