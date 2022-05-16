module API
  module V1
    class ProjectMapSerializer < BaseSerializer
      attributes :trusted

      attribute :latitude do |object, _params|
        object.center&.y
      end

      attribute :longitude do |object, _params|
        object.center&.x
      end
    end
  end
end
