module API
  module V1
    module Projects
      class MapsController < BaseController
        def show
          projects = Project.accessible_by(current_ability)
            .select(:id, :verified, :centroid, :category).order(created_at: :desc)
          projects = API::Filterer.new(projects, filter_params.to_h).call
          render json: ProjectMapSerializer.new(projects).serializable_hash
        end

        private

        def filter_params
          params.fetch(:filter, {}).permit :category, :sdg, :instrument_type, :ticket_size, :impact,
            :only_verified, :full_text, :priority_landscape
        end
      end
    end
  end
end
