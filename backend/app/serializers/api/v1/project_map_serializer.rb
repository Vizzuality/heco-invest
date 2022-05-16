module API
  module V1
    class ProjectMapSerializer < BaseSerializer
      attributes :trusted, :latitude, :longitude
    end
  end
end
