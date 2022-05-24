module API
  module V1
    class LocationSerializer < BaseSerializer
      attributes :name, :location_type

      belongs_to :parent, serializer: :location
    end
  end
end
