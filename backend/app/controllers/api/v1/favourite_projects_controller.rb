module API
  module V1
    class FavouriteProjectsController < BaseController
      before_action :authenticate_user!
      before_action :fetch_projects

      def create
        @project.favourite_projects.create user: current_user
        render json: ProjectSerializer.new(@project, params: {current_user: current_user}).serializable_hash
      end

      def destroy
        FavouriteProject.find_by(user: current_user, project: @project)&.destroy!
        render json: ProjectSerializer.new(@project, params: {current_user: current_user}).serializable_hash
      end

      private

      def fetch_projects
        @project = Project.find params[:project_id]
      end
    end
  end
end
