module API
  module V1
    class FavouriteProjectDevelopersController < BaseController
      before_action :authenticate_user!
      before_action :fetch_project_developers

      def create
        @project_developer.favourite_project_developers.create user: current_user
        render json: ProjectDeveloperSerializer.new(
          @project_developer,
          params: {current_user: current_user}
        ).serializable_hash
      end

      def destroy
        FavouriteProjectDeveloper.find_by(user: current_user, project_developer: @project_developer)&.destroy!
        render json: ProjectDeveloperSerializer.new(
          @project_developer,
          params: {current_user: current_user}
        ).serializable_hash
      end

      private

      def fetch_project_developers
        @project_developer = ProjectDeveloper.find params[:project_developer_id]
      end
    end
  end
end
