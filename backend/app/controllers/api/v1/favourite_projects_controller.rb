module API
  module V1
    class FavouriteProjectsController < BaseController
      before_action :authenticate_user!

      load_and_authorize_resource :project
      load_and_authorize_resource :favourite_project, through: :project, shallow: true

      def create
        @favourite_project.save!
        render json: ProjectSerializer.new(@project, params: {current_user: current_user}).serializable_hash
      end

      def destroy
        @favourite_projects.map(&:destroy!)
        render json: ProjectSerializer.new(@project, params: {current_user: current_user}).serializable_hash
      end
    end
  end
end
