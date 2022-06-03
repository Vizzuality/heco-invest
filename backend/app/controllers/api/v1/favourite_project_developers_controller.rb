module API
  module V1
    class FavouriteProjectDevelopersController < BaseController
      before_action :authenticate_user!

      load_and_authorize_resource :project_developer
      load_and_authorize_resource :favourite_project_developer, through: :project_developer, shallow: true

      def create
        @favourite_project_developer.save!
        render json: ProjectDeveloperSerializer.new(
          @project_developer,
          params: {current_user: current_user}
        ).serializable_hash
      end

      def destroy
        @favourite_project_developers.map(&:destroy!)
        render json: ProjectDeveloperSerializer.new(
          @project_developer,
          params: {current_user: current_user}
        ).serializable_hash
      end
    end
  end
end
