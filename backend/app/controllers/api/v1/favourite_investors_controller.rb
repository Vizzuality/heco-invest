module API
  module V1
    class FavouriteInvestorsController < BaseController
      before_action :authenticate_user!

      load_and_authorize_resource :investor
      load_and_authorize_resource :favourite_investor, through: :investor, shallow: true

      def create
        @favourite_investor.save
        render json: InvestorSerializer.new(@investor, params: {current_user: current_user, current_ability: current_ability}).serializable_hash
      end

      def destroy
        @favourite_investors.find_by(user: current_user)&.destroy!
        render json: InvestorSerializer.new(@investor, params: {current_user: current_user, current_ability: current_ability}).serializable_hash
      end

      private

      def favourite_investor_params
        {user: current_user}
      end
    end
  end
end
