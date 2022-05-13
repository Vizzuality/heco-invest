module API
  module V1
    class ProjectMapSerializer < BaseSerializer
      attributes :geometry, :latitude, :longitude
    end
  end
end
