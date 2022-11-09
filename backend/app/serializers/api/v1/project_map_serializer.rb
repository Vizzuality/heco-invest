module API
  module V1
    class ProjectMapSerializer < BaseSerializer
      attributes :verified, :category

      attribute :latitude do |object, _params|
        object.centroid&.y
      end

      attribute :longitude do |object, _params|
        object.centroid&.x
      end
    end
  end
end
