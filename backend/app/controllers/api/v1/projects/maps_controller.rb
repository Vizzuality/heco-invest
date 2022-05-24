module API
  module V1
    module Projects
      class MapsController < BaseController
        def show
          projects = Project.select(:id, :trusted, :latitude, :longitude, :category)
          projects = API::Filterer.new(projects, filter_params.to_h).call
          render json: ProjectMapSerializer.new(projects).serializable_hash
        end

        private

        def filter_params
          params.fetch(:filter, {}).permit :category, :sdg, :instrument_type, :ticket_size, :only_verified, :full_text
        end
      end
    end
  end
end
