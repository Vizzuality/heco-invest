class LocationType
  include EnumModel

  TYPES = %w[
    state
    department
    municipality
    region
  ].freeze
end
