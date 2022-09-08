module API
  module V1
    class FavouriteOpenCallsController < BaseController
      before_action :authenticate_user!

      load_and_authorize_resource :open_call
      load_and_authorize_resource :favourite_open_call, through: :open_call, shallow: true

      def create
        @favourite_open_call.save
        render json: OpenCallSerializer.new(
          @open_call,
          params: {current_user: current_user, current_ability: current_ability}
        ).serializable_hash
      end

      def destroy
        @favourite_open_calls.find_by(user: current_user)&.destroy!
        render json: OpenCallSerializer.new(
          @open_call,
          params: {current_user: current_user, current_ability: current_ability}
        ).serializable_hash
      end

      private

      def favourite_open_call_params
        {user: current_user}
      end
    end
  end
end
