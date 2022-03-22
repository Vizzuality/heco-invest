module API
  module V1
    class LocationSerializer
      include JSONAPI::Serializer

      attributes :name, :location_type

      belongs_to :parent, serializer: :location

      has_many :regions, serializer: :location
    end
  end
end
